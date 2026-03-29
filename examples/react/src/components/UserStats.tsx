import type { UserStats as UserStatsType } from '../utils/helpers'

interface UserStatsProps {
  stats: UserStatsType
}

export function UserStats({ stats }: UserStatsProps) {
  return (
    <div className="stats">
      <h3>Statistics</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{stats.totalCount}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.adminCount}</span>
          <span className="stat-label">Admins</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.userCount}</span>
          <span className="stat-label">Users</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats.guestCount}</span>
          <span className="stat-label">Guests</span>
        </div>
      </div>
    </div>
  )
}
