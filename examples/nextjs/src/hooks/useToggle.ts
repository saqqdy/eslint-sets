'use client'

import { useCallback, useState } from 'react'

export function useToggle(
  initialValue: boolean = false,
): [boolean, (value?: boolean) => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback((newValue?: boolean) => {
    if (typeof newValue === 'boolean') {
      setValue(newValue)
    } else {
      setValue(prev => !prev)
    }
  }, [])

  return [value, toggle]
}
