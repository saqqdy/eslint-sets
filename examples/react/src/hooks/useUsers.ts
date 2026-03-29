import type { User, UserStats } from '../utils/helpers'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { calculateUserStats, filterUsers, sortUsers } from '../utils/helpers'

interface UseUsersOptions {
  autoLoad?: boolean
}

interface UseUsersReturn {
  error: string | null
  loading: boolean
  users: User[]
  stats: UserStats
  filteredUsers: User[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedRole: User['role'] | ''
  setSelectedRole: (role: User['role'] | '') => void
  sortBy: keyof User
  setSortBy: (sortBy: keyof User) => void
  sortOrder: 'asc' | 'desc'
  setSortOrder: (order: 'asc' | 'desc') => void
  selectedUser: User | null
  selectUser: (user: User | null) => void
  deleteUser: (userId: number) => void
  refresh: () => void
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

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState<User['role'] | ''>('')
  const [sortBy, setSortBy] = useState<keyof User>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedUser, selectUser] = useState<User | null>(null)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => {
        setTimeout(resolve, 500)
      })
      setUsers(mockUsers)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autoLoad) {
      loadUsers()
    }
  }, [autoLoad, loadUsers])

  const stats = useMemo<UserStats>(() => calculateUserStats(users), [users])

  const filteredUsers = useMemo(() => {
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
  }, [users, selectedRole, searchQuery, sortBy, sortOrder])

  const deleteUser = useCallback((userId: number) => {
    setUsers(prev => prev.filter(u => u.id !== userId))

    if (selectedUser?.id === userId) {
      selectUser(null)
    }
  }, [selectedUser])

  return {
    error,
    loading,
    users,
    stats,
    filteredUsers,
    searchQuery,
    setSearchQuery,
    selectedRole,
    setSelectedRole,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedUser,
    selectUser,
    deleteUser,
    refresh: loadUsers,
  }
}
