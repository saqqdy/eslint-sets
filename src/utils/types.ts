/**
 * Awaitable type - can be a value or a promise of that value
 */
export type Awaitable<T> = T | Promise<T>
