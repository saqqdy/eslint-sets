<script lang="ts">
  import type { User } from '../utils/helpers'

  interface Props {
    user: User
    showEmail?: boolean
    onselect?: (user: User) => void
    ondelete?: (userId: number) => void
  }

  let { user, showEmail = false, onselect, ondelete }: Props = $props()

  let displayName = $derived(user.name.toUpperCase())
  let roleBadgeClass = $derived(`badge-${user.role}`)

  function handleSelect(): void {
    onselect?.(user)
  }

  function handleDelete(): void {
    ondelete?.(user.id)
  }
</script>

<div class="user-card">
  <div class="user-header">
    <span class="user-name">{displayName}</span>
    <span class="role-badge {roleBadgeClass}">{user.role}</span>
  </div>
  {#if showEmail}
    <p class="user-email">{user.email}</p>
  {/if}
  <div class="user-actions">
    <button type="button" class="btn-select" onclick={handleSelect}>
      Select
    </button>
    <button type="button" class="btn-delete" onclick={handleDelete}>
      Delete
    </button>
  </div>
</div>

<style>
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
    background-color: #ff3e00;
    color: white;
  }

  .btn-delete {
    background-color: #ff4757;
    color: white;
  }
</style>
