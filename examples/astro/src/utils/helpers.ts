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

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

export const USER_ROLES = ['admin', 'user', 'guest'] as const

export type UserRole = (typeof USER_ROLES)[number]
