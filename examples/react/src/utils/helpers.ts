// Utility functions for the React example

export interface User {
  email: string
  id: number
  name: string
  role: 'admin' | 'user' | 'guest'
}

export interface UserStats {
  adminCount: number
  guestCount: number
  totalCount: number
  userCount: number
}

export interface ApiResponse<T> {
  data: T
  message: string
  status: number
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

export function groupBy<T, K extends string | number | symbol>(
  items: T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = keyFn(item)

      if (!acc[key]) {
        acc[key] = []
      }

      acc[key].push(item)

      return acc
    },
    {} as Record<K, T[]>,
  )
}

export function calculateUserStats(users: User[]): UserStats {
  return users.reduce<UserStats>(
    (stats, user) => {
      stats.totalCount++

      switch (user.role) {
        case 'admin':
          stats.adminCount++
          break
        case 'guest':
          stats.guestCount++
          break
        case 'user':
          stats.userCount++
          break
      }

      return stats
    },
    { adminCount: 0, guestCount: 0, totalCount: 0, userCount: 0 },
  )
}

export function filterUsers(users: User[], search: string): User[] {
  if (!search.trim()) {
    return users
  }

  const lowerSearch = search.toLowerCase()

  return users.filter(
    user =>
      user.name.toLowerCase().includes(lowerSearch)
      || user.email.toLowerCase().includes(lowerSearch),
  )
}

export function sortUsers<T extends User>(
  users: T[],
  sortBy: keyof User,
  sortOrder: 'asc' | 'desc' = 'asc',
): T[] {
  return [...users].sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
    }

    return 0
  })
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000,
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0

    async function attempt(): Promise<void> {
      try {
        const result = await fn()
        resolve(result)
      } catch (error) {
        attempts++

        if (attempts >= maxAttempts) {
          reject(error)
        } else {
          await sleep(delay)
          await attempt()
        }
      }
    }

    attempt()
  })
}

export const USER_ROLES = ['admin', 'user', 'guest'] as const

export type UserRole = (typeof USER_ROLES)[number]

// Additional utility functions for more coverage

export interface Product {
  category: string
  id: number
  inStock: boolean
  name: string
  price: number
  tags: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShoppingCart {
  items: CartItem[]
  total: number
  userId: number
}

// Deep clone utility
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T
  }

  const cloned = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

// Deep merge utility
export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target }

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key]
      const targetValue = target[key]

      if (
        sourceValue
        && typeof sourceValue === 'object'
        && !Array.isArray(sourceValue)
        && targetValue
        && typeof targetValue === 'object'
        && !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>,
        ) as T[Extract<keyof T, string>]
      } else {
        result[key] = sourceValue as T[Extract<keyof T, string>]
      }
    }
  }

  return result
}

// Curry function
export function curry<T extends (...args: unknown[]) => unknown>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> | ((...args: Parameters<T>) => ReturnType<T>) {
  const arity = fn.length
  return function curried(...args: unknown[]): unknown {
    if (args.length >= arity) {
      return fn(...args)
    }
    return (...moreArgs: unknown[]) => curried(...args, ...moreArgs)
  } as unknown as (...args: Parameters<T>) => ReturnType<T> | ((...args: Parameters<T>) => ReturnType<T>)
}

// Flatten nested arrays
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.flat() as T[]
}

// Unique values from array
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

// Chunk array into smaller arrays
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

// Zip two arrays
export function zip<A, B>(a: A[], b: B[]): Array<[A, B]> {
  const length = Math.min(a.length, b.length)
  const result: Array<[A, B]> = []
  for (let i = 0; i < length; i++) {
    result.push([a[i], b[i]])
  }
  return result
}

// Partition array based on predicate
export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = []
  const fail: T[] = []
  for (const item of array) {
    if (predicate(item)) {
      pass.push(item)
    } else {
      fail.push(item)
    }
  }
  return [pass, fail]
}

// Pick properties from object
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

// Omit properties from object
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result as Omit<T, K>
}

// Create a range of numbers
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }
  return result
}

// Check if value is empty
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true
  }
  if (typeof value === 'string') {
    return value.trim().length === 0
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return false
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    currency,
    style: 'currency',
  }).format(amount)
}

// Parse query string
export function parseQueryString(query: string): Record<string, string> {
  const params = new URLSearchParams(query)
  const result: Record<string, string> = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

// Build query string
export function buildQueryString(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, String(value))
  }
  return searchParams.toString()
}

// Memoize function results
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string,
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, unknown>()
  return (...args: Parameters<T>) => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>
    }
    const result = fn(...args)
    cache.set(key, result)
    return result as ReturnType<T>
  }
}

// Compose functions right to left
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg)
}

// Pipe functions left to right
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg)
}
