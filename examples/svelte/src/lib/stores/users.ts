import type { User, UserStats } from '../utils/helpers'
import { calculateUserStats, filterUsers, mockUsers, sortUsers } from '../utils/helpers'

// User store using Svelte 5 runes
let users = $state<User[]>([]),
  loading = $state(false),
  error = $state<string | null>(null),
  searchQuery = $state(''),
  selectedRole = $state<User['role'] | ''>(''),
  sortBy = $state<keyof User>('name'),
  sortOrder = $state<'asc' | 'desc'>('asc'),
  selectedUser = $state<User | null>(null)

// Derived state
const stats = $derived<UserStats>(calculateUserStats(users))

const filteredUsers = $derived(() => {
  let result = users

  // Filter by role
  if (selectedRole) {
    result = result.filter(user => user.role === selectedRole)
  }

  // Filter by search
  result = filterUsers(result, searchQuery)

  // Sort
  result = sortUsers(result, sortBy, sortOrder)

  return result
})

// Actions
export async function loadUsers(): Promise<void> {
  loading = true
  error = null

  try {
    // Simulate API call
    await new Promise(resolve => {
      setTimeout(resolve, 500)
    })
    users = mockUsers
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load users'
  } finally {
    loading = false
  }
}

export function selectUser(user: User | null): void {
  selectedUser = user
}

export function deleteUser(userId: number): void {
  users = users.filter(u => u.id !== userId)

  if (selectedUser?.id === userId) {
    selectedUser = null
  }
}

export function toggleSortOrder(): void {
  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
}

// Getters for external use
export function getUsersStore() {
  return {
    get users() {
      return users
    },
    get loading() {
      return loading
    },
    get error() {
      return error
    },
    get stats() {
      return stats
    },
    get filteredUsers() {
      return filteredUsers()
    },
    get searchQuery() {
      return searchQuery
    },
    set searchQuery(value: string) {
      searchQuery = value
    },
    get selectedRole() {
      return selectedRole
    },
    set selectedRole(value: User['role'] | '') {
      selectedRole = value
    },
    get sortBy() {
      return sortBy
    },
    set sortBy(value: keyof User) {
      sortBy = value
    },
    get sortOrder() {
      return sortOrder
    },
    get selectedUser() {
      return selectedUser
    },
  }
}

// Initialize on module load
loadUsers()
