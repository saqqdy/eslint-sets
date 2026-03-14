import { ref, type Ref, watch } from 'vue'

export interface UseLocalStorageOptions<T> {
  serializer?: {
    read: (value: string) => T
    write: (value: T) => string
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {},
): Ref<T> {
  const { serializer = { read: JSON.parse, write: JSON.stringify } } = options

  // Browser-only: localStorage is a Web API, not Node.js
  /* eslint-disable n/no-unsupported-features/node-builtins */
  const storedValue = localStorage.getItem(key)
  const data = ref(storedValue ? serializer.read(storedValue) : initialValue) as Ref<T>

  watch(data, (newValue) => {
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, serializer.write(newValue))
    }
  })
  /* eslint-enable n/no-unsupported-features/node-builtins */

  return data
}
