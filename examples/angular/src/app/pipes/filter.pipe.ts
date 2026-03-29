import type { PipeTransform } from '@angular/core'
import { Pipe } from '@angular/core'

@Pipe({
  name: 'filter',
  pure: true,
  standalone: true,
})
export class FilterPipe<T> implements PipeTransform {
  transform(items: T[], predicate: (item: T) => boolean): T[] {
    if (!items || !predicate) {
      return items
    }
    return items.filter(predicate)
  }
}

@Pipe({
  name: 'sortBy',
  pure: true,
  standalone: true,
})
export class SortByPipe<T> implements PipeTransform {
  transform(
    items: T[],
    key: keyof T,
    order: 'asc' | 'desc' = 'asc',
  ): T[] {
    if (!items || !key) {
      return items
    }

    return [...items].sort((a, b) => {
      const aVal = a[key]
      const bVal = b[key]

      if (aVal === bVal) return 0
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1

      const comparison = aVal < bVal ? -1 : 1
      return order === 'asc' ? comparison : -comparison
    })
  }
}

@Pipe({
  name: 'truncate',
  pure: true,
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit: number = 50,
    ellipsis: string = '...',
  ): string {
    if (!value) return ''
    if (value.length <= limit) return value
    return value.substring(0, limit) + ellipsis
  }
}

@Pipe({
  name: 'safeHtml',
  pure: true,
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
}
