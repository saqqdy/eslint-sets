import { CommonModule } from '@angular/common'
import { Component, signal } from '@angular/core'

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  standalone: true,
  styles: `
    main {
      text-align: center;
      padding: 2rem;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
  `,
  template: `
    <main>
      <h1>Angular Counter</h1>
      <p>Count: {{ count() }}</p>
      <button (click)="increment()">Increment</button>
    </main>
  `,
})
export class AppComponent {
  count = signal(0)

  increment(): void {
    this.count.update((value) => value + 1)
  }
}
