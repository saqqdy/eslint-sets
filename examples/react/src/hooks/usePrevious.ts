import { useEffect, useRef } from 'react'

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export function useCompare<T>(value: T, compareFn?: (prev: T, next: T) => boolean): boolean {
  const previousRef = useRef<T>(value)
  const isEqual = compareFn ? compareFn(previousRef.current, value) : previousRef.current === value

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = value
    }
  }, [value, isEqual])

  return isEqual
}
