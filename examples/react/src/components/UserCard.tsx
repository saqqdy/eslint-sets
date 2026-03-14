import type { MouseEventHandler } from 'react'
import type { User } from '../utils/helpers'
import { useCallback } from 'react'

export interface UserCardProps {
  onDelete?: (userId: number) => void
  onSelect?: (user: User) => void
  showEmail?: boolean
  user: User
}

export function UserCard({
  onDelete,
  onSelect,
  showEmail = false,
  user,
}: UserCardProps) {
  const displayName = user.name.toUpperCase()

  const handleSelect: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onSelect?.(user)
  }, [onSelect, user])

  const handleDelete: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onDelete?.(user.id)
  }, [onDelete, user.id])

  return (
    <div className="user-card">
      <div className="user-header">
        <span className="user-name">
          {displayName}
        </span>
        <span className={`role-badge badge-${user.role}`}>
          {user.role}
        </span>
      </div>
      {showEmail && (
        <p className="user-email">
          {user.email}
        </p>
      )}
      <div className="user-actions">
        <button type="button" className="btn-select" onClick={handleSelect}>
          Select
        </button>
        <button type="button" className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}
