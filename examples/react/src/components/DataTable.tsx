import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

export interface Column<T> {
  header: string
  key: keyof T
  render?: (value: T[keyof T], row: T) => ReactNode
  sortable?: boolean
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  pageSize?: number
  rowKey: keyof T
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 10,
  rowKey,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)

  const sortedData = useMemo(() => {
    if (!sortKey) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (aVal === bVal) return 0
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1

      const comparison = aVal < bVal ? -1 : 1
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [data, sortKey, sortDirection])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  const totalPages = Math.ceil(data.length / pageSize)

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  return (
    <div className="data-table">
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={String(column.key)}
                style={{
                  borderBottom: '2px solid #ddd',
                  cursor: column.sortable ? 'pointer' : 'default',
                  padding: '12px',
                  textAlign: 'left',
                }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                {column.header}
                {column.sortable && sortKey === column.key && (
                  <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(row => (
            <tr key={String(row[rowKey])}>
              {columns.map(column => (
                <td
                  key={String(column.key)}
                  style={{ borderBottom: '1px solid #ddd', padding: '12px' }}
                >
                  {column.render ? column.render(row[column.key], row) : String(row[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div
          className="pagination"
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Previous
          </button>
          <span>
            Page
            {' '}
            {currentPage}
            {' '}
            of
            {' '}
            {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
