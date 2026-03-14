// Utility functions for the Vue 3 example

export interface User {
  email: string
  id: number
  name: string
  role: 'admin' | 'user' | 'guest'
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

export const USER_ROLES = ['admin', 'user', 'guest'] as const

export type UserRole = (typeof USER_ROLES)[number]
