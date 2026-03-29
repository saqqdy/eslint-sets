import type { ElementRef, OnDestroy } from '@angular/core'
import { Directive, EventEmitter, HostListener, inject, Output } from '@angular/core'

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() appClickOutside = new EventEmitter<void>()

  private wasInside = false
  private readonly elementRef = inject(ElementRef)

  @HostListener('click')
  onClickInside(): void {
    this.wasInside = true
  }

  @HostListener('document:click')
  onClickDocument(): void {
    if (!this.wasInside) {
      this.appClickOutside.emit()
    }
    this.wasInside = false
  }
}

@Directive({
  selector: '[appDebounceClick]',
  standalone: true,
})
export class DebounceClickDirective implements OnDestroy {
  @Output() appDebounceClick = new EventEmitter<Event>()

  private timeoutId: ReturnType<typeof setTimeout> | null = null
  private readonly delay = 300

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    this.timeoutId = setTimeout(() => {
      this.appDebounceClick.emit(event)
    }, this.delay)
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }
}

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private readonly elementRef = inject(ElementRef)

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.elementRef.nativeElement.style.backgroundColor = '#f5f5f5'
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.elementRef.nativeElement.style.backgroundColor = ''
  }
}
