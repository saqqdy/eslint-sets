import type { Observer } from 'rxjs'
import type { PaginatedResponse, PaginationParams, User } from '../models/user.model'
import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersSubject = new BehaviorSubject<User[]>([])
  private readonly loadingSubject = new BehaviorSubject<boolean>(false)

  readonly users$ = this.usersSubject.asObservable()
  readonly loading$ = this.loadingSubject.asObservable()

  private nextId = 1

  private readonly mockUsers: User[] = [
    { email: 'alice@example.com', id: this.nextId++, name: 'Alice', role: 'admin' },
    { email: 'bob@example.com', id: this.nextId++, name: 'Bob', role: 'user' },
    { email: 'charlie@example.com', id: this.nextId++, name: 'Charlie', role: 'guest' },
  ]

  getAll(): Observable<User[]> {
    this.loadingSubject.next(true)

    return new Observable((observer: Observer<User[]>) => {
      setTimeout(() => {
        this.usersSubject.next([...this.mockUsers])
        observer.next([...this.mockUsers])
        observer.complete()
        this.loadingSubject.next(false)
      }, 500)
    })
  }

  getById(id: number): Observable<User | undefined> {
    return this.users$.pipe(
      map((users) => users.find((user) => user.id === id)),
    )
  }

  create(user: Omit<User, 'id'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: this.nextId++,
    }

    this.mockUsers.push(newUser)
    this.usersSubject.next([...this.mockUsers])

    return new Observable((observer: Observer<User>) => {
      observer.next(newUser)
      observer.complete()
    })
  }

  update(id: number, updates: Partial<User>): Observable<User | undefined> {
    const index = this.mockUsers.findIndex((user) => user.id === id)

    if (index === -1) {
      return new Observable((observer: Observer<User | undefined>) => {
        observer.next(undefined)
        observer.complete()
      })
    }

    const updatedUser = { ...this.mockUsers[index], ...updates }

    this.mockUsers[index] = updatedUser
    this.usersSubject.next([...this.mockUsers])

    return new Observable((observer: Observer<User | undefined>) => {
      observer.next(updatedUser)
      observer.complete()
    })
  }

  delete(id: number): Observable<boolean> {
    const index = this.mockUsers.findIndex((user) => user.id === id)

    if (index === -1) {
      return new Observable((observer: Observer<boolean>) => {
        observer.next(false)
        observer.complete()
      })
    }

    this.mockUsers.splice(index, 1)
    this.usersSubject.next([...this.mockUsers])

    return new Observable((observer: Observer<boolean>) => {
      observer.next(true)
      observer.complete()
    })
  }

  getPaginated(params: PaginationParams): Observable<PaginatedResponse<User>> {
    const { limit, page, sortBy = 'id', sortOrder = 'asc' } = params

    return this.users$.pipe(
      map((users) => {
        const sorted = [...users].sort((a, b) => {
          const aVal = a[sortBy as keyof User]
          const bVal = b[sortBy as keyof User]

          if (typeof aVal === 'string' && typeof bVal === 'string') {
            return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
          }

          if (typeof aVal === 'number' && typeof bVal === 'number') {
            return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
          }

          return 0
        })

        const start = (page - 1) * limit
        const items = sorted.slice(start, start + limit)

        return {
          hasMore: start + limit < sorted.length,
          items,
          limit,
          page,
          total: sorted.length,
        }
      }),
    )
  }
}
