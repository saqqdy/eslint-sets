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
  <main class="text-center p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      UnoCSS User Management
    </h1>

    <!-- Stats -->
    <div class="bg-gray-100 p-4 rounded-lg mb-6 dark:bg-gray-800">
      <h3 class="text-lg font-semibold mb-2">
        Statistics
      </h3>
      <div class="grid grid-cols-4 gap-4 text-center">
        <div>
          <span class="text-2xl font-bold text-blue-500">{{ stats.totalCount }}</span>
          <p class="text-sm text-gray-600">
            Total
          </p>
        </div>
        <div>
          <span class="text-2xl font-bold text-red-500">{{ stats.adminCount }}</span>
          <p class="text-sm text-gray-600">
            Admins
          </p>
        </div>
        <div>
          <span class="text-2xl font-bold text-green-500">{{ stats.userCount }}</span>
          <p class="text-sm text-gray-600">
            Users
          </p>
        </div>
        <div>
          <span class="text-2xl font-bold text-yellow-500">{{ stats.guestCount }}</span>
          <p class="text-sm text-gray-600">
            Guests
          </p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 justify-center mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search users..."
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
      <select
        v-model="selectedRole"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
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
      <select
        v-model="sortBy"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
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
        class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        @click="toggleSortOrder"
      >
        {{ sortOrder === 'asc' ? '↑ Asc' : '↓ Desc' }}
      </button>
      <button
        type="button"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        @click="loadUsers"
      >
        Refresh
      </button>
    </div>

    <!-- Loading State -->
    <p
      v-if="loading"
      class="text-gray-500 italic"
    >
      Loading users...
    </p>

    <!-- Error State -->
    <p
      v-if="error"
      class="text-red-500"
    >
      {{ error }}
    </p>

    <!-- User List -->
    <div
      v-if="!loading && !error"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700"
        @click="selectUser(user)"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold text-gray-800 dark:text-white">{{ user.name }}</span>
          <span
            class="px-2 py-1 rounded text-xs font-medium" :class="[
              user.role === 'admin' ? 'bg-red-100 text-red-800' : '',
              user.role === 'user' ? 'bg-blue-100 text-blue-800' : '',
              user.role === 'guest' ? 'bg-gray-100 text-gray-800' : '',
            ]"
          >
            {{ user.role }}
          </span>
        </div>
        <p
          v-if="selectedUser?.id === user.id"
          class="text-sm text-gray-600 dark:text-gray-400 mb-2"
        >
          {{ user.email }}
        </p>
        <button
          type="button"
          class="mt-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
          @click.stop="deleteUser(user.id)"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <p
      v-if="!loading && !error && filteredUsers.length === 0"
      class="text-gray-500"
    >
      No users found.
    </p>

    <!-- Selected User -->
    <div
      v-if="selectedUser"
      class="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <h3 class="text-lg font-semibold mb-2">
        Selected User
      </h3>
      <p><strong>Name:</strong> {{ selectedUser.name }}</p>
      <p><strong>Email:</strong> {{ selectedUser.email }}</p>
      <p><strong>Role:</strong> {{ selectedUser.role }}</p>
      <button
        type="button"
        class="mt-3 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
        @click="selectUser(null)"
      >
        Clear Selection
      </button>
    </div>
  </main>
</template>
