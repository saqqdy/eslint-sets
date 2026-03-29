import type { User } from '../utils/helpers'
import { writable } from 'svelte/store'

// Theme store
export type Theme = 'dark' | 'light'

function createThemeStore() {
  const { set, subscribe } = writable<Theme>('light')

  return {
    subscribe,
    toggle: () => {
      let current: Theme = 'light'
      const unsubscribe = subscribe(value => {
        current = value
      })
      unsubscribe()
      set(current === 'light' ? 'dark' : 'light')
    },
    set,
  }
}

export const theme = createThemeStore()

// User selection store
function createSelectedUserStore() {
  const { set, subscribe, update } = writable<User | null>(null)

  return {
    clear: () => set(null),
    set,
    subscribe,
    toggle: (user: User) => {
      update(current => (current?.id === user.id ? null : user))
    },
  }
}

export const selectedUser = createSelectedUserStore()

// Counter store with persistence
function createCounterStore() {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('counter') : null
  const initial = stored ? parseInt(stored, 10) : 0

  const { set, subscribe, update } = writable<number>(initial)

  return {
    decrement: () => update(n => Math.max(0, n - 1)),
    increment: () => update(n => n + 1),
    reset: () => set(0),
    set: (value: number) => {
      set(value)
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('counter', String(value))
      }
    },
    subscribe,
  }
}

export const counter = createCounterStore()

// Toast notification store
export interface Toast {
  id: string
  message: string
  type: 'error' | 'info' | 'success' | 'warning'
}

function createToastStore() {
  const { set, subscribe, update } = writable<Toast[]>([])

  let nextId = 0

  return {
    clear: () => set([]),
    error: (message: string) => {
      const toast: Toast = { id: `toast-${nextId++}`, type: 'error', message }
      update(toasts => [...toasts, toast])
      setTimeout(() => {
        update(toasts => toasts.filter(t => t.id !== toast.id))
      }, 3000)
    },
    info: (message: string) => {
      const toast: Toast = { id: `toast-${nextId++}`, type: 'info', message }
      update(toasts => [...toasts, toast])
      setTimeout(() => {
        update(toasts => toasts.filter(t => t.id !== toast.id))
      }, 3000)
    },
    remove: (id: string) => update(toasts => toasts.filter(t => t.id !== id)),
    success: (message: string) => {
      const toast: Toast = { id: `toast-${nextId++}`, type: 'success', message }
      update(toasts => [...toasts, toast])
      setTimeout(() => {
        update(toasts => toasts.filter(t => t.id !== toast.id))
      }, 3000)
    },
    subscribe,
    warning: (message: string) => {
      const toast: Toast = { id: `toast-${nextId++}`, type: 'warning', message }
      update(toasts => [...toasts, toast])
      setTimeout(() => {
        update(toasts => toasts.filter(t => t.id !== toast.id))
      }, 3000)
    },
  }
}

export const toasts = createToastStore()
