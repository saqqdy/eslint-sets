<script setup lang="ts">
import type { User, UserStats } from '../utils/helpers'
import { calculateUserStats, filterUsers, mockUsers, sortUsers } from '../utils/helpers'

// User state
const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')
const selectedRole = ref<User['role'] | ''>('')
const sortBy = ref<keyof User>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')
const selectedUser = ref<User | null>(null)

// Computed values
const stats = computed<UserStats>(() => calculateUserStats(users.value))

const filteredUsers = computed(() => {
  let result = users.value

  // Filter by role
  if (selectedRole.value) {
    result = result.filter((user) => user.role === selectedRole.value)
  }

  // Filter by search
  result = filterUsers(result, searchQuery.value)

  // Sort
  result = sortUsers(result, sortBy.value, sortOrder.value)

  return result
})

// Methods
async function loadUsers(): Promise<void> {
  loading.value = true
  error.value = null

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    users.value = [...mockUsers]
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load users'
  } finally {
    loading.value = false
  }
}

function toggleSortOrder(): void {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

function selectUser(user: User | null): void {
  selectedUser.value = user
}

function deleteUser(userId: number): void {
  users.value = users.value.filter((u) => u.id !== userId)

  if (selectedUser.value?.id === userId) {
    selectedUser.value = null
  }
}

// Lifecycle
onMounted(() => {
  loadUsers()
})
</script>

<template>
  <main>
    <h1>Nuxt User Management</h1>

    <!-- Stats -->
    <div class="stats">
      <h3>Statistics</h3>
      <p>Total: {{ stats.totalCount }} users</p>
      <p>Admins: {{ stats.adminCount }}</p>
      <p>Users: {{ stats.userCount }}</p>
      <p>Guests: {{ stats.guestCount }}</p>
    </div>

    <!-- Filters -->
    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search users..."
      >
      <select v-model="selectedRole">
        <option value="">
          All Roles
        </option>
        <option value="admin">
          Admin
        </option>
        <option value="user">
          User
        </option>
        <option value="guest">
          Guest
        </option>
      </select>
      <select v-model="sortBy">
        <option value="name">
          Sort by Name
        </option>
        <option value="email">
          Sort by Email
        </option>
        <option value="role">
          Sort by Role
        </option>
      </select>
      <button
        type="button"
        @click="toggleSortOrder"
      >
        {{ sortOrder === 'asc' ? '↑ Asc' : '↓ Desc' }}
      </button>
      <button
        type="button"
        @click="loadUsers"
      >
        Refresh
      </button>
    </div>

    <!-- Loading State -->
    <p
      v-if="loading"
      class="loading"
    >
      Loading users...
    </p>

    <!-- Error State -->
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>

    <!-- User List -->
    <div
      v-if="!loading && !error"
      class="user-list"
    >
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="user-card"
        @click="selectUser(user)"
      >
        <div class="user-header">
          <span class="user-name">{{ user.name }}</span>
          <span class="role-badge" :class="[`badge-${user.role}`]">{{ user.role }}</span>
        </div>
        <p
          v-if="selectedUser?.id === user.id"
          class="user-email"
        >
          {{ user.email }}
        </p>
        <button
          type="button"
          class="btn-delete"
          @click.stop="deleteUser(user.id)"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <p v-if="!loading && !error && filteredUsers.length === 0">
      No users found.
    </p>

    <!-- Selected User -->
    <div
      v-if="selectedUser"
      class="selected-user"
    >
      <h3>Selected User</h3>
      <p>Name: {{ selectedUser.name }}</p>
      <p>Email: {{ selectedUser.email }}</p>
      <p>Role: {{ selectedUser.role }}</p>
      <button
        type="button"
        @click="selectUser(null)"
      >
        Clear Selection
      </button>
    </div>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  padding: 2rem;
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

.filters input,
.filters select {
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0.5rem;
}

.filters button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  margin: 0.25rem;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  min-width: 200px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.user-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.user-name {
  font-weight: bold;
}

.role-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.badge-admin {
  background-color: #ff4d4f;
  color: white;
}

.badge-user {
  background-color: #1890ff;
  color: white;
}

.badge-guest {
  background-color: #d9d9d9;
  color: #333;
}

.user-email {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.btn-delete {
  background-color: #ff4d4f;
  border: none;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.loading {
  color: #666;
}

.error {
  color: red;
}

.selected-user {
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
