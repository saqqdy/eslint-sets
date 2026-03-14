export interface User {
  email: string
  id: number
  name: string
  role: 'admin' | 'user' | 'guest'
}

export interface ApiResponse<T> {
  data: T
  message: string
  status: number
}

export interface PaginationParams {
  limit: number
  page: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  hasMore: boolean
  items: T[]
  limit: number
  page: number
  total: number
}
