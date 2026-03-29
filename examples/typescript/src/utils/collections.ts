// Collection utilities

export interface LinkedListNode<T> {
  next: LinkedListNode<T> | null
  value: T
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null = null
  private tail: LinkedListNode<T> | null = null
  private _size: number = 0

  get size(): number {
    return this._size
  }

  get isEmpty(): boolean {
    return this._size === 0
  }

  append(value: T): void {
    const node: LinkedListNode<T> = { value, next: null }

    if (this.tail) {
      this.tail.next = node
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }

    this._size++
  }

  prepend(value: T): void {
    const node: LinkedListNode<T> = { value, next: this.head }

    this.head = node

    if (!this.tail) {
      this.tail = node
    }

    this._size++
  }

  remove(value: T): boolean {
    if (!this.head) {
      return false
    }

    if (this.head.value === value) {
      this.head = this.head.next

      if (!this.head) {
        this.tail = null
      }

      this._size--

      return true
    }

    let current = this.head

    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next

        if (!current.next) {
          this.tail = current
        }

        this._size--

        return true
      }

      current = current.next
    }

    return false
  }

  find(predicate: (value: T) => boolean): T | undefined {
    let current = this.head

    while (current) {
      if (predicate(current.value)) {
        return current.value
      }

      current = current.next
    }

    return undefined
  }

  toArray(): T[] {
    const result: T[] = []
    let current = this.head

    while (current) {
      result.push(current.value)
      current = current.next
    }

    return result
  }

  * [Symbol.iterator](): Generator<T> {
    let current = this.head

    while (current) {
      yield current.value
      current = current.next
    }
  }
}

export class Queue<T> {
  private items: T[] = []

  get size(): number {
    return this.items.length
  }

  get isEmpty(): boolean {
    return this.items.length === 0
  }

  enqueue(item: T): void {
    this.items.push(item)
  }

  dequeue(): T | undefined {
    return this.items.shift()
  }

  peek(): T | undefined {
    return this.items[0]
  }

  clear(): void {
    this.items = []
  }

  toArray(): T[] {
    return [...this.items]
  }
}

export class Stack<T> {
  private items: T[] = []

  get size(): number {
    return this.items.length
  }

  get isEmpty(): boolean {
    return this.items.length === 0
  }

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  clear(): void {
    this.items = []
  }

  toArray(): T[] {
    return [...this.items].reverse()
  }
}
