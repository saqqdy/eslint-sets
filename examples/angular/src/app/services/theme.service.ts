import type { OnDestroy } from '@angular/core'
import type { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export type Theme = 'dark' | 'light'

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private readonly themeSubject = new BehaviorSubject<Theme>(this.getInitialTheme())

  readonly theme$: Observable<Theme> = this.themeSubject.asObservable()

  get currentTheme(): Theme {
    return this.themeSubject.value
  }

  private getInitialTheme(): Theme {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null
      if (stored === 'dark' || stored === 'light') {
        return stored
      }

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
    return 'light'
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  toggle(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light'
    this.setTheme(newTheme)
  }

  ngOnDestroy(): void {
    this.themeSubject.complete()
  }
}
