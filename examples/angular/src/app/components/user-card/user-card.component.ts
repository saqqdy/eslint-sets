import type { User } from '../../models/user.model'
import { CommonModule } from '@angular/common'
import { Component, input, output } from '@angular/core'

@Component({
  imports: [CommonModule],
  selector: 'app-user-card',
  standalone: true,
  styles: `
    .user-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 12px;
    }
    .user-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user-name {
      font-weight: bold;
      font-size: 18px;
    }
    .role-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      text-transform: uppercase;
    }
    .badge-admin {
      background-color: #ff4757;
      color: white;
    }
    .badge-user {
      background-color: #2ed573;
      color: white;
    }
    .badge-guest {
      background-color: #747d8c;
      color: white;
    }
    .user-email {
      color: #666;
      margin: 8px 0;
    }
    .user-actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .btn-select,
    .btn-delete {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-select {
      background-color: #dd0031;
      color: white;
    }
    .btn-delete {
      background-color: #ff4757;
      color: white;
    }
  `,
  template: `
    <div class="user-card">
      <div class="user-header">
        <span class="user-name">{{ user().name.toUpperCase() }}</span>
        <span [class]="'role-badge badge-' + user().role">{{ user().role }}</span>
      </div>
      @if (showEmail()) {
        <p class="user-email">{{ user().email }}</p>
      }
      <div class="user-actions">
        <button type="button" class="btn-select" (click)="userSelect.emit(user())">
          Select
        </button>
        <button type="button" class="btn-delete" (click)="userDelete.emit(user().id)">
          Delete
        </button>
      </div>
    </div>
  `,
})
export class UserCardComponent {
  readonly user = input.required<User>()
  readonly showEmail = input<boolean>(false)

  readonly userSelect = output<User>()
  readonly userDelete = output<number>()
}
