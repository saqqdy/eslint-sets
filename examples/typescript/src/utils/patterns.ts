// Design pattern utilities

export type Observer<T> = (value: T) => void

export type Unsubscribe = () => void

/**
 * Observable pattern implementation
 */
export class Observable<T> {
  private observers: Set<Observer<T>> = new Set()
  private _value: T

  constructor(initialValue: T) {
    this._value = initialValue
  }

  get value(): T {
    return this._value
  }

  set value(newValue: T) {
    if (this._value !== newValue) {
      this._value = newValue
      this.notify()
    }
  }

  subscribe(observer: Observer<T>): Unsubscribe {
    this.observers.add(observer)
    // Immediately notify with current value
    observer(this._value)

    return () => {
      this.observers.delete(observer)
    }
  }

  private notify(): void {
    for (const observer of this.observers) {
      observer(this._value)
    }
  }
}

/**
 * Computed value that automatically updates when dependencies change
 */
export class Computed<T> {
  private cachedValue: T | undefined
  private dirty: boolean = true
  private readonly getter: () => T
  private readonly dependencies: Observable<unknown>[]

  constructor(getter: () => T, dependencies: Observable<unknown>[] = []) {
    this.getter = getter
    this.dependencies = dependencies

    // Subscribe to all dependencies
    for (const dep of dependencies) {
      dep.subscribe(() => {
        this.dirty = true
      })
    }
  }

  get value(): T {
    if (this.dirty) {
      this.cachedValue = this.getter()
      this.dirty = false
    }

    return this.cachedValue as T
  }
}

/**
 * Simple event emitter
 */
export class EventEmitter<EventMap extends Record<string, unknown>> {
  private listeners: Map<keyof EventMap, Set<(data: unknown) => void>> = new Map()

  on<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void): Unsubscribe {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }

    const listeners = this.listeners.get(event)!
    listeners.add(listener as (data: unknown) => void)

    return () => {
      listeners.delete(listener as (data: unknown) => void)
    }
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    const listeners = this.listeners.get(event)

    if (listeners) {
      for (const listener of listeners) {
        listener(data)
      }
    }
  }

  once<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void): void {
    const unsubscribe = this.on(event, data => {
      unsubscribe()
      listener(data)
    })
  }

  removeAllListeners(event?: keyof EventMap): void {
    if (event) {
      this.listeners.delete(event)
    } else {
      this.listeners.clear()
    }
  }
}

/**
 * Singleton pattern with lazy initialization
 */
export function createSingleton<T>(factory: () => T): () => T {
  let instance: T | undefined

  return () => {
    if (instance === undefined) {
      instance = factory()
    }

    return instance
  }
}

/**
 * Factory pattern for creating objects
 */
export interface Factory<T, Args extends unknown[] = []> {
  create: (...args: Args) => T
}

export function createFactory<T, Args extends unknown[] = []>(
  factoryFn: (...args: Args) => T,
): Factory<T, Args> {
  return {
    create: factoryFn,
  }
}

/**
 * Builder pattern for constructing complex objects
 */
export abstract class Builder<T> {
  abstract build(): T
}

/**
 * Pool pattern for object reuse
 */
export class ObjectPool<T> {
  private available: T[] = []
  private inUse: Set<T> = new Set()

  constructor(
    private readonly factory: () => T,
    private readonly reset: (obj: T) => void,
    initialSize: number = 0,
  ) {
    for (let i = 0; i < initialSize; i++) {
      this.available.push(factory())
    }
  }

  acquire(): T {
    let obj: T

    if (this.available.length > 0) {
      obj = this.available.pop()!
    } else {
      obj = this.factory()
    }

    this.inUse.add(obj)

    return obj
  }

  release(obj: T): void {
    if (this.inUse.has(obj)) {
      this.inUse.delete(obj)
      this.reset(obj)
      this.available.push(obj)
    }
  }

  get availableCount(): number {
    return this.available.length
  }

  get inUseCount(): number {
    return this.inUse.size
  }
}
