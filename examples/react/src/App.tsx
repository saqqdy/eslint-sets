import type { User } from './utils/helpers'
import { useState } from 'react'
import { CounterDisplay } from './components/CounterDisplay'
import { UserCard } from './components/UserCard'
import { UserStats } from './components/UserStats'
import { useCounter } from './hooks/useCounter'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useUsers } from './hooks/useUsers'

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  const {
    error,
    loading,
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
    refresh,
  } = useUsers()

  const counter = useCounter({ initialValue: 0, max: 10, min: 0 })

  const [showCounter, setShowCounter] = useState(true)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>React + ESLint Sets Example</h1>
        <button type="button" onClick={toggleTheme}>
          Toggle Theme (
          {theme}
          )
        </button>
      </header>

      {/* Counter Section */}
      <section>
        <h2>Counter</h2>
        <button type="button" onClick={() => setShowCounter(!showCounter)}>
          {showCounter ? 'Hide' : 'Show'}
          {' '}
          Counter
        </button>
        {showCounter && (
          <CounterDisplay
            initialValue={0}
            max={10}
            min={0}
          />
        )}
        <p>
          Global counter value:
          {counter.count}
        </p>
      </section>

      {/* User Management Section */}
      <section>
        <h2>User Management</h2>

        {/* Stats */}
        <UserStats stats={stats} />

        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value as User['role'] | '')}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as keyof User)}
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="role">Sort by Role</option>
          </select>
          <button type="button" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>
          <button type="button" onClick={refresh}>
            Refresh
          </button>
        </div>

        {/* Loading State */}
        {loading && <p className="loading">Loading users...</p>}

        {/* Error State */}
        {error && <p className="error">{error}</p>}

        {/* User List */}
        {!loading && !error && (
          <div className="user-list">
            {filteredUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                showEmail={selectedUser?.id === user.id}
                onSelect={selectUser}
                onDelete={deleteUser}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredUsers.length === 0 && (
          <p>No users found.</p>
        )}
      </section>

      {/* Selected User */}
      {selectedUser && (
        <section className="selected-user">
          <h3>Selected User</h3>
          <p>
            Name:
            {selectedUser.name}
          </p>
          <p>
            Email:
            {selectedUser.email}
          </p>
          <p>
            Role:
            {selectedUser.role}
          </p>
          <button type="button" onClick={() => selectUser(null)}>
            Clear Selection
          </button>
        </section>
      )}
    </div>
  )
}

export default App
