import type { User, UserStats } from './models/user.model'
import { AsyncPipe, CommonModule } from '@angular/common'
import { Component, computed, effect, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CounterComponent } from './components/counter/counter.component'
import { UserCardComponent } from './components/user-card/user-card.component'
import { CounterService } from './services/counter.service'
import { UserService } from './services/user.service'
import { calculateUserStats, filterUsers, sortUsers } from './utils/helpers'

@Component({
  imports: [AsyncPipe, CommonModule, CounterComponent, FormsModule, UserCardComponent],
  selector: 'app-root',
  standalone: true,
  styles: `
    main {
      text-align: center;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
      margin: 0.25rem;
    }
    input, select {
      padding: 0.5rem;
      font-size: 1rem;
      margin: 0.5rem;
    }
    .user-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
    }
    .stats {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
    }
    .filters {
      margin: 1rem 0;
    }
    .loading {
      color: #666;
    }
    .error {
      color: red;
    }
  `,
  template: `
    <main>
      <h1>Angular + ESLint Sets Example</h1>

      <!-- Counter Section -->
      <section>
        <h2>Counter: {{ counterService.value() }}</h2>
        <button type="button" (click)="counterService.increment()">+</button>
        <button type="button" (click)="counterService.decrement()">-</button>
        <button type="button" (click)="counterService.reset()">Reset</button>
      </section>

      <!-- User Management Section -->
      <section>
        <h2>User Management</h2>

        <!-- Stats -->
        <div class="stats">
          <h3>Statistics</h3>
          <p>Total: {{ userStats().totalCount }} users</p>
          <p>Admins: {{ userStats().adminCount }}</p>
          <p>Users: {{ userStats().userCount }}</p>
          <p>Guests: {{ userStats().guestCount }}</p>
        </div>

        <!-- Filters -->
        <div class="filters">
          <input
            type="text"
            placeholder="Search users..."
            [ngModel]="searchQuery()"
            (ngModelChange)="searchQuery.set($event)"
          />
          <select [ngModel]="selectedRole()" (ngModelChange)="selectedRole.set($event)">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
          <select [ngModel]="sortBy()" (ngModelChange)="sortBy.set($event)">
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="role">Sort by Role</option>
          </select>
        </div>

        <!-- Loading State -->
        @if (loading()) {
          <div class="loading">
            Loading users...
          </div>
        }

        <!-- Error State -->
        @if (error()) {
          <div class="error">
            {{ error() }}
          </div>
        }

        <!-- User List -->
        @if (!loading() && !error()) {
          <div class="user-list">
            @for (user of filteredUsers(); track user.id) {
              <app-user-card
                [user]="user"
                (select)="onUserSelect($event)"
                (delete)="onUserDelete($event)"
              />
            }
          </div>
        }

        <!-- Empty State -->
        @if (!loading() && !error() && filteredUsers().length === 0) {
          <div>
            No users found.
          </div>
        }
      </section>

      <!-- Selected User -->
      @if (selectedUser()) {
        <section>
          <h3>Selected User</h3>
          <p>Name: {{ selectedUser()!.name }}</p>
          <p>Email: {{ selectedUser()!.email }}</p>
          <p>Role: {{ selectedUser()!.role }}</p>
          <button type="button" (click)="selectedUser.set(null)">Clear Selection</button>
        </section>
      }
    </main>
  `,
})
export class AppComponent {
  // Services
  readonly counterService = inject(CounterService)
  private readonly userService = inject(UserService)

  constructor() {
    // Load users on init
    this.loadUsers()

    // Effect to log counter changes
    effect(() => {
      console.warn('Counter value:', this.counterService.value())
    })
  }

  // User state
  readonly users = signal<User[]>([])
  readonly loading = signal(false)
  readonly error = signal<string | null>(null)
  readonly selectedUser = signal<User | null>(null)

  // Filter state
  readonly searchQuery = signal('')
  readonly selectedRole = signal<User['role'] | ''>('')
  readonly sortBy = signal<keyof User>('name')
  readonly sortOrder = signal<'asc' | 'desc'>('asc')

  // Computed values
  readonly userStats = computed<UserStats>(() => calculateUserStats(this.users()))

  readonly filteredUsers = computed(() => {
    let result = this.users()

    // Filter by role
    const role = this.selectedRole()
    if (role) {
      result = result.filter(user => user.role === role)
    }

    // Filter by search
    result = filterUsers(result, this.searchQuery())

    // Sort
    result = sortUsers(result, this.sortBy(), this.sortOrder())

    return result
  })

  // Methods
  loadUsers(): void {
    this.loading.set(true)
    this.error.set(null)

    this.userService.getAll().subscribe({
      error: err => {
        this.error.set(err.message ?? 'Failed to load users')
        this.loading.set(false)
      },
      next: users => {
        this.users.set(users)
        this.loading.set(false)
      },
    })
  }

  onUserSelect(user: User): void {
    this.selectedUser.set(user)
  }

  onUserDelete(userId: number): void {
    this.userService.delete(userId).subscribe({
      next: success => {
        if (success) {
          this.users.update(users => users.filter(u => u.id !== userId))
          if (this.selectedUser()?.id === userId) {
            this.selectedUser.set(null)
          }
        }
      },
    })
  }
}
