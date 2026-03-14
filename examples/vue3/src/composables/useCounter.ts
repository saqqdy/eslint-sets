import { computed, type ComputedRef, ref, type Ref } from 'vue'

export interface UseCounterOptions {
  initialValue?: number
  max?: number
  min?: number
  step?: number
}

export interface UseCounterReturn {
  count: Ref<number>
  decrement: () => void
  increment: () => void
  isMax: ComputedRef<boolean>
  isMin: ComputedRef<boolean>
  reset: () => void
  setCount: (value: number) => void
}

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { initialValue = 0, max = Infinity, min = -Infinity, step = 1 } = options

  const count = ref(initialValue)

  const isMin = computed(() => count.value <= min)
  const isMax = computed(() => count.value >= max)

  function increment(): void {
    if (count.value + step <= max) {
      count.value += step
    }
  }

  function decrement(): void {
    if (count.value - step >= min) {
      count.value -= step
    }
  }

  function reset(): void {
    count.value = initialValue
  }

  function setCount(value: number): void {
    count.value = Math.min(Math.max(value, min), max)
  }

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
