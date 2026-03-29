// Functional programming utilities

/**
 * Compose multiple functions from right to left
 */
export function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C
export function compose<A, B, C, D>(
  f: (c: C) => D,
  g: (b: B) => C,
  h: (a: A) => B,
): (a: A) => D
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg)
}

/**
 * Pipe multiple functions from left to right
 */
export function pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C
export function pipe<A, B, C, D>(
  f: (a: A) => B,
  g: (b: B) => C,
  h: (c: C) => D,
): (a: A) => D
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg)
}

/**
 * Curry a function
 */
export function curry<A, B, R>(fn: (a: A, b: B) => R): (a: A) => (b: B) => R {
  return (a: A) => (b: B) => fn(a, b)
}

/**
 * Partial application
 */
export function partial<Args extends unknown[], R>(
  fn: (...args: Args) => R,
  ...presetArgs: Partial<Args>
): (...remainingArgs: Partial<Args>) => R {
  return (...remainingArgs: Partial<Args>) => fn(...presetArgs, ...remainingArgs) as R
}

/**
 * Memoize a function
 */
export function memoize<Args extends unknown[], R>(
  fn: (...args: Args) => R,
  keyFn?: (...args: Args) => string,
): (...args: Args) => R {
  const cache = new Map<string, R>()

  return (...args: Args): R => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)!
    }

    const result = fn(...args)
    cache.set(key, result)

    return result
  }
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle a function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true

      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Once - ensure function is called only once
 */
export function once<T extends (...args: unknown[]) => unknown>(
  fn: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let called = false,
    result: ReturnType<T>

  return (...args: Parameters<T>) => {
    if (!called) {
      called = true
      result = fn(...args) as ReturnType<T>

      return result
    }

    return undefined
  }
}

/**
 * Identity function
 */
export function identity<T>(value: T): T {
  return value
}

/**
 * Always return the same value
 */
export function always<T>(value: T): (...args: unknown[]) => T {
  return () => value
}

/**
 * Negate a predicate
 */
export function not<T extends unknown[]>(
  predicate: (...args: T) => boolean,
): (...args: T) => boolean {
  return (...args: T) => !predicate(...args)
}

/**
 * Flip the arguments of a two-argument function
 */
export function flip<A, B, R>(fn: (a: A, b: B) => R): (b: B, a: A) => R {
  return (b: B, a: A) => fn(a, b)
}

// Array utilities

/**
 * Get the first element of an array
 */
export function head<T>(array: T[]): T | undefined {
  return array[0]
}

/**
 * Get all but the first element of an array
 */
export function tail<T>(array: T[]): T[] {
  return array.slice(1)
}

/**
 * Get the last element of an array
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1]
}

/**
 * Check if array is empty
 */
export function isEmpty<T>(array: T[]): boolean {
  return array.length === 0
}

/**
 * Get unique elements from array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Flatten nested arrays
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.flat() as T[]
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }

  return result
}

/**
 * Zip two arrays together
 */
export function zip<A, B>(a: A[], b: B[]): Array<[A, B]> {
  const length = Math.min(a.length, b.length)
  const result: Array<[A, B]> = []

  for (let i = 0; i < length; i++) {
    result.push([a[i], b[i]])
  }

  return result
}

/**
 * Partition array based on predicate
 */
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
