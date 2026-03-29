<script lang="ts">
import Vue from 'vue'
import Counter from './components/Counter.vue'
import UserCard from './components/UserCard.vue'
import Tabs from './components/Tabs.vue'
import { calculateUserStats, filterUsers, mockUsers, sortUsers } from './utils/helpers'
import type { User, UserStats } from './utils/helpers'

export default Vue.extend({
  name: 'App',
  components: {
    Counter,
    UserCard,
    Tabs,
  },
  data() {
    return {
      users: [] as User[],
      loading: false,
      error: null as string | null,
      searchQuery: '',
      selectedRole: '' as User['role'] | '',
      sortBy: 'name' as keyof User,
      sortOrder: 'asc' as 'asc' | 'desc',
      selectedUser: null as User | null,
      theme: 'light' as 'light' | 'dark',
      activeTab: 'users',
    }
  },
  computed: {
    stats(): UserStats {
      return calculateUserStats(this.users)
    },
    filteredUsers(): User[] {
      let result = this.users

      // Filter by role
      if (this.selectedRole) {
        result = result.filter((user) => user.role === this.selectedRole)
      }

      // Filter by search
      result = filterUsers(result, this.searchQuery)

      // Sort
      result = sortUsers(result, this.sortBy, this.sortOrder)

      return result
    },
    tabs(): Array<{ id: string; label: string }> {
      return [
        { id: 'counter', label: 'Counter' },
        { id: 'users', label: 'Users' },
      ]
    },
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    async loadUsers(): Promise<void> {
      this.loading = true
      this.error = null

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        this.users = [...mockUsers]
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to load users'
      } finally {
        this.loading = false
      }
    },
    toggleTheme(): void {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
    toggleSortOrder(): void {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
    },
    selectUser(user: User | null): void {
      this.selectedUser = user
    },
    deleteUser(userId: number): void {
      this.users = this.users.filter((u) => u.id !== userId)

      if (this.selectedUser?.id === userId) {
        this.selectedUser = null
      }
    },
    handleTabChange(tabId: string): void {
      this.activeTab = tabId
    },
  },
})
</script>

<template>
  <div id="app" class="app-container" :class="[theme]">
    <header>
      <h1>Vue 2 + ESLint Sets Example</h1>
      <button
        type="button"
        @click="toggleTheme"
      >
        Toggle Theme ({{ theme }})
      </button>
    </header>

    <Tabs
      :tabs="tabs"
      default-tab="users"
      @change="handleTabChange"
    >
      <div v-if="activeTab === 'counter'">
        <Counter />
      </div>
      <div v-else-if="activeTab === 'users'">
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
      </div>
    </Tabs>
  </div>
</template>

<style>
.app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 20px;
}

.app-container.dark {
  background-color: #1a1a1a;
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

.stats {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.dark .stats {
  background: #2a2a2a;
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
