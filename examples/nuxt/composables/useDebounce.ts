import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout> | null = null

  watch(value, newValue => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  return debouncedValue
}

export function useDebouncedRef<T>(initialValue: T, delay: number): {
  debouncedValue: Ref<T>
  setValue: (value: T) => void
  immediateValue: Ref<T>
} {
  const immediateValue = ref(initialValue) as Ref<T>
  const debouncedValue = ref(initialValue) as Ref<T>
  let timeout: ReturnType<typeof setTimeout> | null = null

  const setValue = (value: T) => {
    immediateValue.value = value
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      debouncedValue.value = value
    }, delay)
  }

  return { debouncedValue, immediateValue, setValue }
}

export function useDebounceFn<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
