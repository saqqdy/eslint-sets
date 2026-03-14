import type { Signal, WritableSignal } from '@angular/core'
import { Injectable, signal } from '@angular/core'

export interface CounterState {
  max: number
  min: number
  step: number
  value: number
}

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private readonly _value: WritableSignal<number> = signal(0)
  private readonly _min: WritableSignal<number> = signal(0)
  private readonly _max: WritableSignal<number> = signal(100)
  private readonly _step: WritableSignal<number> = signal(1)

  readonly value: Signal<number> = this._value.asReadonly()
  readonly min: Signal<number> = this._min.asReadonly()
  readonly max: Signal<number> = this._max.asReadonly()
  readonly step: Signal<number> = this._step.asReadonly()

  readonly isMin = signal(false)
  readonly isMax = signal(false)

  initialize(options: Partial<CounterState> = {}): void {
    const { max = 100, min = 0, step = 1, value = 0 } = options

    this._min.set(min)
    this._max.set(max)
    this._step.set(step)
    this._value.set(Math.min(Math.max(value, min), max))
    this.updateFlags()
  }

  increment(): void {
    const newValue = this._value() + this._step()

    if (newValue <= this._max()) {
      this._value.set(newValue)
      this.updateFlags()
    }
  }

  decrement(): void {
    const newValue = this._value() - this._step()

    if (newValue >= this._min()) {
      this._value.set(newValue)
      this.updateFlags()
    }
  }

  reset(): void {
    this._value.set(this._min())
    this.updateFlags()
  }

  setValue(value: number): void {
    this._value.set(Math.min(Math.max(value, this._min()), this._max()))
    this.updateFlags()
  }

  private updateFlags(): void {
    this.isMin.set(this._value() <= this._min())
    this.isMax.set(this._value() >= this._max())
  }
}
