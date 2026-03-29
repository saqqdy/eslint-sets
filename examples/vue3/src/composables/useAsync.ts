import { computed, ref, type Ref, watch } from 'vue'

export interface AsyncState<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  isLoading: Ref<boolean>
  isError: Ref<boolean>
  isSuccess: Ref<boolean>
  execute: () => Promise<void>
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  options: { immediate?: boolean } = {},
): AsyncState<T> {
  const { immediate = true } = options

  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<Error | null>(null)
  const isLoading = ref(false)

  const isError = computed(() => error.value !== null)
  const isSuccess = computed(() => data.value !== null && error.value === null)

  const execute = async () => {
    isLoading.value = true
    error.value = null

    try {
      const result = await asyncFunction()
      data.value = result
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      isLoading.value = false
    }
  }

  if (immediate) {
    execute()
  }

  return {
    data,
    error,
    execute,
    isError,
    isLoading,
    isSuccess,
  }
}

export function useAsyncState<T>(
  asyncFunction: () => Promise<T>,
  initialState: T,
): AsyncState<T> {
  const data = ref<T>(initialState) as Ref<T>
  const error = ref<Error | null>(null)
  const isLoading = ref(false)

  const isError = computed(() => error.value !== null)
  const isSuccess = computed(() => error.value === null)

  const execute = async () => {
    isLoading.value = true
    error.value = null

    try {
      const result = await asyncFunction()
      data.value = result
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      isLoading.value = false
    }
  }

  return {
    data: data as Ref<T | null>,
    error,
    execute,
    isError,
    isLoading,
    isSuccess,
  }
}

export function useFetch<T>(url: Ref<string> | string): AsyncState<T> {
  const urlRef = typeof url === 'string' ? ref(url) : url

  const fetcher = async () => {
    const response = await fetch(urlRef.value)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json() as Promise<T>
  }

  const state = useAsync(fetcher, { immediate: false })

  watch(urlRef, () => {
    state.execute()
  }, { immediate: true })

  return state
}
