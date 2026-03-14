import type { Readable, Writable } from 'svelte/store'
import { derived, writable } from 'svelte/store'

export interface CounterOptions {
  initialValue?: number
  max?: number
  min?: number
  step?: number
}

export interface CounterStore extends Readable<number> {
  decrement: () => void
  increment: () => void
  reset: () => void
  set: (value: number) => void
}

export function createCounterStore(options: CounterOptions = {}): CounterStore {
  const { initialValue = 0, max = Infinity, min = -Infinity, step = 1 } = options

  const count: Writable<number> = writable(initialValue)

  function increment(): void {
    count.update((n) => (n + step <= max ? n + step : n))
  }

  function decrement(): void {
    count.update((n) => (n - step >= min ? n - step : n))
  }

  function reset(): void {
    count.set(initialValue)
  }

  function set(value: number): void {
    count.set(Math.min(Math.max(value, min), max))
  }

  return {
    decrement,
    increment,
    reset,
    set,
    subscribe: count.subscribe,
  }
}

export function createDerivedCounter(store: Readable<number>, min: number, max: number) {
  return derived(store, ($count) => ({
    isMax: $count >= max,
    isMin: $count <= min,
  }))
}
