// Svelte 5 runes-based composables

/**
 * Debounce a value using Svelte 5 runes
 */
export function useDebounce<T>(value: () => T, delay: number): () => T {
  let debouncedValue = $state(value()),
    timeout: ReturnType<typeof setTimeout> | null = null

  $effect(() => {
    const currentValue = value()
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      debouncedValue = currentValue
    }, delay)
  })

  return () => debouncedValue
}

/**
 * Toggle state using Svelte 5 runes
 */
export function useToggle(initialValue: boolean = false): {
  toggle: () => void
  setFalse: () => void
  setTrue: () => void
  value: () => boolean
} {
  let value = $state(initialValue)

  const toggle = () => {
    value = !value
  }

  const setTrue = () => {
    value = true
  }

  const setFalse = () => {
    value = false
  }

  return {
    value: () => value,
    setFalse,
    setTrue,
    toggle,
  }
}

/**
 * Counter using Svelte 5 runes
 */
export function useCounter(initialValue: number = 0, options: {
  max?: number
  min?: number
  step?: number
} = {}): {
  count: () => number
  decrement: () => void
  increment: () => void
  reset: () => void
  setCount: (value: number) => void
} {
  const { max = Infinity, min = -Infinity, step = 1 } = options
  let count = $state(initialValue)

  const increment = () => {
    if (count + step <= max) {
      count += step
    }
  }

  const decrement = () => {
    if (count - step >= min) {
      count -= step
    }
  }

  const reset = () => {
    count = initialValue
  }

  const setCount = (value: number) => {
    count = Math.min(Math.max(value, min), max)
  }

  return {
    count: () => count,
    decrement,
    increment,
    reset,
    setCount,
  }
}

/**
 * Mouse position using Svelte 5 runes
 */
export function useMouse(): {
  x: () => number
  y: () => number
  sourceType: () => 'mouse' | 'touch' | null
} {
  let x = $state(0),
    y = $state(0),
    sourceType = $state<'mouse' | 'touch' | null>(null)

  $effect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      sourceType = 'mouse'
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        x = event.touches[0].clientX
        y = event.touches[0].clientY
        sourceType = 'touch'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  })

  return {
    sourceType: () => sourceType,
    x: () => x,
    y: () => y,
  }
}

/**
 * Media query using Svelte 5 runes
 */
export function useMediaQuery(query: string): () => boolean {
  let matches = $state(false)

  $effect(() => {
    const mediaQuery = window.matchMedia(query)
    matches = mediaQuery.matches

    const handler = (event: MediaQueryListEvent) => {
      matches = event.matches
    }

    mediaQuery.addEventListener('change', handler)

    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  })

  return () => matches
}

/**
 * Breakpoint helper using Svelte 5 runes
 */
export function useBreakpoint(): {
  isDesktop: () => boolean
  isMobile: () => boolean
  isTablet: () => boolean
} {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return {
    isDesktop,
    isMobile,
    isTablet,
  }
}
