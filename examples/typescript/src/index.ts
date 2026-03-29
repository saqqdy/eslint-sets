interface User {
  email: string
  id: number
  name: string
}

function greet(user: User): string {
  return `Hello, ${user.name}!`
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

for (const user of users) {
  console.warn(greet(user))
}

// Extended interfaces for more coverage
export interface Product {
  category: string
  id: number
  inStock: boolean
  name: string
  price: number
  tags: string[]
}

export interface Order {
  createdAt: Date
  id: string
  items: Array<{ product: Product, quantity: number }>
  status: 'cancelled' | 'completed' | 'pending' | 'processing'
  total: number
  userId: number
}

// Advanced type utilities
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K
}[keyof T]

export type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never
}[keyof T]

// Tuple utilities
export type First<T extends readonly unknown[]> = T extends [infer F, ...unknown[]] ? F : never
export type Last<T extends readonly unknown[]> = T extends [...unknown[], infer L] ? L : never
export type Tail<T extends readonly unknown[]> = T extends [unknown, ...infer R] ? R : never

// Advanced functions with generics
export function createReducer<State, Action extends { type: string }>(
  initialState: State,
  handlers: Record<Action['type'], (state: State, action: Action) => State>,
): (state: State | undefined, action: Action) => State {
  return (state = initialState, action) => {
    const handler = handlers[action.type as Action['type']]
    return handler ? handler(state, action) : state
  }
}

// Async generator for streaming data
export async function* fetchPaginatedData<T>(
  fetcher: (page: number, limit: number) => Promise<{ data: T[], hasMore: boolean }>,
  options: { limit?: number, maxPages?: number } = {},
): AsyncGenerator<T[], void, unknown> {
  const { limit = 10, maxPages = Infinity } = options
  let page = 1,
    hasMore = true

  while (hasMore && page <= maxPages) {
    const result = await fetcher(page, limit)
    yield result.data
    hasMore = result.hasMore
    page++
  }
}

// Observer pattern implementation
export interface Observer<T> {
  complete?: () => void
  error?: (error: Error) => void
  next: (value: T) => void
}

export class Subject<T> {
  private observers: Set<Observer<T>> = new Set()

  subscribe(observer: Observer<T>): () => void {
    this.observers.add(observer)
    return () => this.observers.delete(observer)
  }

  next(value: T): void {
    for (const observer of this.observers) {
      observer.next(value)
    }
  }

  error(err: Error): void {
    for (const observer of this.observers) {
      observer.error?.(err)
    }
  }

  complete(): void {
    for (const observer of this.observers) {
      observer.complete?.()
    }
    this.observers.clear()
  }
}

// Decorator pattern (for future TypeScript decorator support)
export function memoizeMethod(
  _target: unknown,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...args: unknown[]) => unknown>,
): TypedPropertyDescriptor<(...args: unknown[]) => unknown> {
  const original = descriptor.value
  const cache = new Map<string, unknown>()

  if (typeof original === 'function') {
    descriptor.value = function (this: unknown, ...args: unknown[]) {
      const key = JSON.stringify(args)
      if (cache.has(key)) {
        return cache.get(key)
      }
      const result = original.apply(this, args)
      cache.set(key, result)
      return result
    }
  }

  return descriptor
}

// Result type for error handling
export type Result<T, E = Error> = { error: E, success: false } | { data: T, success: true }

export function success<T>(data: T): Result<T, never> {
  return { data, success: true }
}

export function failure<E>(error: E): Result<never, E> {
  return { error, success: false }
}

export function tryCatch<T, E = Error>(fn: () => T): Result<T, E> {
  try {
    return success(fn())
  } catch (error) {
    return failure(error as E)
  }
}

export async function tryCatchAsync<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    return success(await promise)
  } catch (error) {
    return failure(error as E)
  }
}

// Builder pattern
export class QueryBuilder<T extends Record<string, unknown>> {
  private conditions: string[] = []
  private orderField?: string
  private orderDirection?: 'asc' | 'desc'
  private limitCount?: number
  private offsetCount?: number

  where(field: keyof T, operator: string, value: unknown): this {
    this.conditions.push(`${String(field)} ${operator} ${JSON.stringify(value)}`)
    return this
  }

  orderBy(field: keyof T, direction: 'asc' | 'desc' = 'asc'): this {
    this.orderField = String(field)
    this.orderDirection = direction
    return this
  }

  limit(count: number): this {
    this.limitCount = count
    return this
  }

  offset(count: number): this {
    this.offsetCount = count
    return this
  }

  build(): string {
    let query = 'SELECT * FROM table'

    if (this.conditions.length > 0) {
      query += ` WHERE ${this.conditions.join(' AND ')}`
    }

    if (this.orderField) {
      query += ` ORDER BY ${this.orderField} ${this.orderDirection}`
    }

    if (this.limitCount !== undefined) {
      query += ` LIMIT ${this.limitCount}`
    }

    if (this.offsetCount !== undefined) {
      query += ` OFFSET ${this.offsetCount}`
    }

    return query
  }
}

// Immutable data structures helpers
export function freezeDeep<T extends object>(obj: T): Readonly<T> {
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const value = obj[key]
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      freezeDeep(value as object)
    }
  }
  return Object.freeze(obj)
}

export function updateImmutable<T extends object>(obj: T, updates: Partial<T>): T {
  return Object.freeze({ ...obj, ...updates })
}

// Event handling utilities
export type EventMap = Record<string, unknown>
export type EventListener<T> = (event: T) => void

export class TypedEventEmitter<Events extends EventMap> {
  private listeners = new Map<keyof Events, Set<EventListener<unknown>>>()

  on<K extends keyof Events>(event: K, listener: EventListener<Events[K]>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    const set = this.listeners.get(event)!
    set.add(listener as EventListener<unknown>)
    return () => this.off(event, listener)
  }

  once<K extends keyof Events>(event: K, listener: EventListener<Events[K]>): void {
    const unsubscribe = this.on(event, data => {
      unsubscribe()
      listener(data)
    })
  }

  off<K extends keyof Events>(event: K, listener: EventListener<Events[K]>): void {
    this.listeners.get(event)?.delete(listener as EventListener<unknown>)
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const set = this.listeners.get(event)
    if (set) {
      for (const listener of set) {
        listener(data)
      }
    }
  }
}

export { greet, users }
export type { User }
