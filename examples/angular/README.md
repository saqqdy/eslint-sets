# Angular + ESLint Sets Example

This example demonstrates how to use `@eslint-sets/eslint-config` with an Angular project.

## Features

- Angular 19
- Standalone components
- Signals for reactive state
- Services with dependency injection

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── counter/
│   │   │   └── counter.component.ts
│   │   └── user-card/
│   │       └── user-card.component.ts
│   ├── models/
│   │   └── user.model.ts
│   ├── services/
│   │   ├── counter.service.ts
│   │   └── user.service.ts
│   └── app.component.ts
├── main.ts                    # App entry point
└── index.html                 # HTML template
```

## ESLint Configuration

```typescript
// eslint.config.ts
import eslintConfig from '@eslint-sets/eslint-config'

export default eslintConfig({
  angular: true,
  typescript: true,
})
```

## Scripts

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run lint
pnpm lint

# Run lint with auto-fix
pnpm lint:fix

# Build for production
pnpm build
```

## Standalone Components

```typescript
import { Component, signal } from '@angular/core'

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div>
      <h2>Counter</h2>
      <p>{{ count() }}</p>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
    </div>
  `,
})
export class CounterComponent {
  count = signal(0)

  increment(): void {
    this.count.update(v => v + 1)
  }

  decrement(): void {
    this.count.update(v => v - 1)
  }
}
```

## Services with Signals

```typescript
import { Injectable, signal, type Signal, type WritableSignal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class CounterService {
  private readonly _value: WritableSignal<number> = signal(0)

  readonly value: Signal<number> = this._value.asReadonly()

  increment(): void {
    this._value.update(v => v + 1)
  }

  decrement(): void {
    this._value.update(v => v - 1)
  }
}
```

## Notes

- Uses Angular's new signals API for reactive state
- Standalone components (no NgModules)
- Services use `providedIn: 'root'` for singleton pattern
- ESLint validates both TypeScript and HTML templates
