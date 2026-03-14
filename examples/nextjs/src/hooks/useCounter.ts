'use client'

import { useCallback, useMemo, useState } from 'react'

export interface UseCounterOptions {
  initialValue?: number
  max?: number
  min?: number
  step?: number
}

export interface UseCounterReturn {
  count: number
  decrement: () => void
  increment: () => void
  isMax: boolean
  isMin: boolean
  reset: () => void
  setCount: (value: number) => void
}

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { initialValue = 0, max = Infinity, min = -Infinity, step = 1 } = options

  const [count, setCountState] = useState(initialValue)

  const isMin = useMemo(() => count <= min, [count, min])
  const isMax = useMemo(() => count >= max, [count, max])

  const increment = useCallback(() => {
    setCountState((prev) => (prev + step <= max ? prev + step : prev))
  }, [max, step])

  const decrement = useCallback(() => {
    setCountState((prev) => (prev - step >= min ? prev - step : prev))
  }, [min, step])

  const reset = useCallback(() => {
    setCountState(initialValue)
  }, [initialValue])

  const setCount = useCallback(
    (value: number) => {
      setCountState(Math.min(Math.max(value, min), max))
    },
    [min, max],
  )

  return {
    count,
    decrement,
    increment,
    isMax,
    isMin,
    reset,
    setCount,
  }
}
