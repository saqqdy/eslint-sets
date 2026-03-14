import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

export interface UseLocalStorageOptions<T> {
  serializer?: {
    read: (value: string) => T
    write: (value: T) => string
  }
}

export function localStorageStore<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {},
): Writable<T> {
  const { serializer = { read: JSON.parse, write: JSON.stringify } } = options

  // Browser-only: localStorage is a Web API, not Node.js
  /* eslint-disable n/no-unsupported-features/node-builtins */
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null
  const initial = storedValue ? serializer.read(storedValue) : initialValue

  const store = writable<T>(initial)

  if (typeof window !== 'undefined') {
    store.subscribe((value) => {
      if (value === null || value === undefined) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, serializer.write(value))
      }
    })
  }
  /* eslint-enable n/no-unsupported-features/node-builtins */

  return store
}
