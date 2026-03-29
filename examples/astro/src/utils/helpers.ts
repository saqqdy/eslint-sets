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

export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result as Omit<T, K>
}

export const USER_ROLES = ['admin', 'user', 'guest'] as const

export type UserRole = (typeof USER_ROLES)[number]

// Mock data for demo
export const mockUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'guest' },
  { id: 4, name: 'Diana', email: 'diana@example.com', role: 'user' },
  { id: 5, name: 'Eve', email: 'eve@example.com', role: 'admin' },
]
