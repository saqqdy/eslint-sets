import { useCallback, useEffect, useState } from 'react'

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
): [T, (value: T | ((prev: T) => T)) => void] {
  const { serializer = { read: JSON.parse, write: JSON.stringify } } = options

  // Browser-only: localStorage is a Web API, not Node.js
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)

      return item ? serializer.read(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value

        localStorage.setItem(key, serializer.write(valueToStore))

        return valueToStore
      })
    },
    [key, serializer],
  )

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setStoredValue(serializer.read(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, serializer])

  return [storedValue, setValue]
}
