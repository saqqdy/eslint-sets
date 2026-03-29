import type { OnDestroy } from '@angular/core'
import type { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface Toast {
  id: string
  message: string
  type: 'error' | 'info' | 'success' | 'warning'
  duration?: number
}

@Injectable({
  providedIn: 'root',
})
export class ToastService implements OnDestroy {
  private readonly toastsSubject = new BehaviorSubject<Toast[]>([])

  readonly toasts$: Observable<Toast[]> = this.toastsSubject.asObservable()

  private nextId = 0

  show(message: string, type: Toast['type'] = 'info', duration: number = 3000): void {
    const id = `toast-${this.nextId++}`
    const toast: Toast = { id, type, duration, message }

    const currentToasts = this.toastsSubject.value
    this.toastsSubject.next([...currentToasts, toast])

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id)
      }, duration)
    }
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration)
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration)
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration)
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration)
  }

  remove(id: string): void {
    const currentToasts = this.toastsSubject.value
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id))
  }

  clear(): void {
    this.toastsSubject.next([])
  }

  ngOnDestroy(): void {
    this.toastsSubject.complete()
  }
}
