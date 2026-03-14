import type { OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Component, inject, input } from '@angular/core'
import { CounterService } from '../../services/counter.service'

@Component({
  imports: [CommonModule],
  selector: 'app-counter',
  standalone: true,
  styles: `
    .counter {
      text-align: center;
      padding: 20px;
      border: 2px solid #dd0031;
      border-radius: 12px;
      max-width: 300px;
      margin: 20px auto;
    }
    .count-value {
      font-size: 48px;
      font-weight: bold;
      color: #dd0031;
    }
    .counter-buttons {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin: 16px 0;
    }
    .counter-buttons button {
      padding: 12px 24px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background-color: #dd0031;
      color: white;
      transition: background-color 0.2s;
    }
    .counter-buttons button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .counter-buttons button:hover:not(:disabled) {
      background-color: #c3002f;
    }
    .counter-status {
      font-style: italic;
      color: #666;
    }
  `,
  template: `
    <div class="counter">
      <h2>Counter Example</h2>
      <p class="count-value">{{ counterService.value() }}</p>
      <div class="counter-buttons">
        <button type="button" [disabled]="counterService.isMin()" (click)="counterService.decrement()">
          -
        </button>
        <button type="button" (click)="counterService.reset()">
          Reset
        </button>
        <button type="button" [disabled]="counterService.isMax()" (click)="counterService.increment()">
          +
        </button>
      </div>
      <p class="counter-status">
        @if (counterService.isMin()) {
          <span>At minimum value</span>
        } @else if (counterService.isMax()) {
          <span>At maximum value</span>
        } @else {
          <span>Counting...</span>
        }
      </p>
    </div>
  `,
})
export class CounterComponent implements OnInit {
  readonly counterService = inject(CounterService)

  readonly initialValue = input<number>(0)
  readonly min = input<number>(0)
  readonly max = input<number>(10)

  ngOnInit(): void {
    this.counterService.initialize({
      max: this.max(),
      min: this.min(),
      step: 1,
      value: this.initialValue(),
    })
  }
}
