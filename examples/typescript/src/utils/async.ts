// Async utilities

export interface Task<T> {
  error?: Error
  id: string
  promise: Promise<T>
  result?: T
  status: 'pending' | 'running' | 'completed' | 'failed'
}

export class AsyncTaskQueue<T = unknown> {
  private queue: Array<() => Promise<T>> = []
  private running: number = 0
  private maxConcurrent: number

  constructor(maxConcurrent: number = 3) {
    this.maxConcurrent = maxConcurrent
  }

  add(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task()

          resolve(result)

          return result
        } catch (error) {
          reject(error)

          throw error
        }
      })

      this.process()
    })
  }

  private async process(): Promise<void> {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return
    }

    this.running++

    const task = this.queue.shift()

    if (task) {
      await task()
    }

    this.running--

    this.process()
  }

  get size(): number {
    return this.queue.length
  }

  get isProcessing(): boolean {
    return this.running > 0
  }
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxAttempts?: number; delay?: number } = {},
): Promise<T> {
  const { delay = 1000, maxAttempts = 3 } = options
  let lastError: Error | undefined

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxAttempts) {
        await new Promise((resolve) => {
          setTimeout(resolve, delay * attempt)
        })
      }
    }
  }

  throw lastError
}

export async function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout after ${ms}ms`))
    }, ms)

    promise
      .then((result) => {
        clearTimeout(timer)
        resolve(result)
      })
      .catch((error) => {
        clearTimeout(timer)
        reject(error)
      })
  })
}

export async function* mapAsync<T, R>(
  items: AsyncIterable<T> | Iterable<T>,
  mapper: (item: T) => Promise<R>,
): AsyncGenerator<R> {
  for await (const item of items) {
    yield await mapper(item)
  }
}

export async function collectAsync<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = []

  for await (const item of iterable) {
    result.push(item)
  }

  return result
}
