import type { User, UserStats } from '../utils/helpers'
import { computed, type ComputedRef, ref, type Ref, shallowRef, type ShallowRef } from 'vue'
import { calculateUserStats, filterUsers, sortUsers } from '../utils/helpers'

interface UseUsersOptions {
  autoLoad?: boolean
}

interface UseUsersReturn {
  error: Readonly<Ref<string | null>>
  loading: Readonly<Ref<boolean>>
  users: Readonly<ShallowRef<User[]>>
  stats: ComputedRef<UserStats>
  filteredUsers: ComputedRef<User[]>
  searchQuery: Ref<string>
  selectedRole: Ref<User['role'] | ''>
  sortBy: Ref<keyof User>
  sortOrder: Ref<'asc' | 'desc'>
  selectedUser: Ref<User | null>
  selectUser: (user: User | null) => void
  deleteUser: (userId: number) => void
  refresh: () => Promise<void>
}

// Mock data
const mockUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'guest' },
  { id: 4, name: 'Diana', email: 'diana@example.com', role: 'user' },
  { id: 5, name: 'Eve', email: 'eve@example.com', role: 'admin' },
]

export function useUsers(options: UseUsersOptions = {}): UseUsersReturn {
  const { autoLoad = true } = options

  const users = shallowRef<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const selectedRole = ref<User['role'] | ''>('')
  const sortBy = ref<keyof User>('name')
  const sortOrder = ref<'asc' | 'desc'>('asc')
  const selectedUser = ref<User | null>(null)

  const stats = computed<UserStats>(() => calculateUserStats(users.value))

  const filteredUsers = computed(() => {
    let result = users.value

    // Filter by role
    if (selectedRole.value) {
      result = result.filter(user => user.role === selectedRole.value)
    }

    // Filter by search
    result = filterUsers(result, searchQuery.value)

    // Sort
    result = sortUsers(result, sortBy.value, sortOrder.value)

    return result
  })

  async function loadUsers(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => {
        setTimeout(resolve, 500)
      })
      users.value = mockUsers
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load users'
    } finally {
      loading.value = false
    }
  }

  function selectUser(user: User | null): void {
    selectedUser.value = user
  }

  function deleteUser(userId: number): void {
    users.value = users.value.filter(u => u.id !== userId)

    if (selectedUser.value?.id === userId) {
      selectedUser.value = null
    }
  }

  // Auto-load on mount
  if (autoLoad) {
    loadUsers()
  }

  return {
    error,
    loading,
    users,
    stats,
    filteredUsers,
    searchQuery,
    selectedRole,
    sortBy,
    sortOrder,
    selectedUser,
    selectUser,
    deleteUser,
    refresh: loadUsers,
  }
}
