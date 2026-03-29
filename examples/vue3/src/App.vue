<script setup lang="ts">
import type { User } from './utils/helpers'
import { ref } from 'vue'
import CounterDisplay from './components/CounterDisplay.vue'
import UserCard from './components/UserCard.vue'
import UserStats from './components/UserStats.vue'
import { useCounter } from './composables/useCounter'
import { useLocalStorage } from './composables/useLocalStorage'
import { useUsers } from './composables/useUsers'

// Theme toggle
const theme = useLocalStorage('theme', 'light')

function toggleTheme(): void {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Counter
const counter = useCounter({ initialValue: 0, max: 10, min: 0 })
const showCounter = ref(true)

// Users
const {
  error,
  loading,
  stats,
  filteredUsers,
  searchQuery,
  selectedRole,
  sortBy,
  sortOrder,
  selectedUser,
  selectUser,
  deleteUser,
  refresh,
} = useUsers()

// Sort order toggle
function toggleSortOrder(): void {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <div class="app" :class="[theme]">
    <header>
      <h1>Vue 3 + ESLint Sets Example</h1>
      <button type="button" @click="toggleTheme">
        Toggle Theme ({{ theme }})
      </button>
    </header>

    <!-- Counter Section -->
    <section>
      <h2>Counter</h2>
      <button type="button" @click="showCounter = !showCounter">
        {{ showCounter ? 'Hide' : 'Show' }} Counter
      </button>
      <CounterDisplay v-if="showCounter" :initial-value="0" :max="10" :min="0" />
      <p>Global counter value: {{ counter.count.value }}</p>
    </section>

    <!-- User Management Section -->
    <section>
      <h2>User Management</h2>

      <!-- Stats -->
      <UserStats :stats="stats" />

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
        <button type="button" @click="toggleSortOrder">
          {{ sortOrder === 'asc' ? '↑ Asc' : '↓ Desc' }}
        </button>
        <button type="button" @click="refresh">
          Refresh
        </button>
      </div>

      <!-- Loading State -->
      <p v-if="loading" class="loading">
        Loading users...
      </p>

      <!-- Error State -->
      <p v-if="error" class="error">
        {{ error }}
      </p>

      <!-- User List -->
      <div v-if="!loading && !error" class="user-list">
        <UserCard
          v-for="user in filteredUsers"
          :key="user.id"
          :user="user"
          :show-email="selectedUser?.id === user.id"
          @select="selectUser"
          @delete="deleteUser"
        />
      </div>

      <!-- Empty State -->
      <p v-if="!loading && !error && filteredUsers.length === 0">
        No users found.
      </p>
    </section>

    <!-- Selected User -->
    <section v-if="selectedUser" class="selected-user">
      <h3>Selected User</h3>
      <p>Name: {{ selectedUser.name }}</p>
      <p>Email: {{ selectedUser.email }}</p>
      <p>Role: {{ selectedUser.role }}</p>
      <button type="button" @click="selectUser(null)">
        Clear Selection
      </button>
    </section>
  </div>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.app.dark {
  background: #1a1a1a;
  color: #fff;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 0.25rem;
}

input,
select {
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0.5rem;
}

.filters {
  margin: 1rem 0;
}

.user-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
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

.dark .selected-user {
  background: #2a2a2a;
}
</style>
