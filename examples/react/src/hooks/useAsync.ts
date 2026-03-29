import { useCallback, useEffect, useState } from 'react'

export interface AsyncState<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true,
): AsyncState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: immediate,
  })

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, error: null, loading: true }))

    try {
      const data = await asyncFunction()
      setState({ data, error: null, loading: false })
    } catch (error) {
      setState({ data: null, error: error instanceof Error ? error : new Error(String(error)), loading: false })
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { ...state, execute }
}

export function useAsyncCallback<T, Args extends unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>,
): AsyncState<T> & { execute: (...args: Args) => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
  })

  const execute = useCallback(async (...args: Args) => {
    setState(prev => ({ ...prev, error: null, loading: true }))

    try {
      const data = await asyncFunction(...args)
      setState({ data, error: null, loading: false })
    } catch (error) {
      setState({ data: null, error: error instanceof Error ? error : new Error(String(error)), loading: false })
    }
  }, [asyncFunction])

  return { ...state, execute }
}
