import { ref, type Ref } from 'vue'

export function useToggle(initialValue: boolean = false): {
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
  value: Ref<boolean>
} {
  const value = ref(initialValue)

  const toggle = () => {
    value.value = !value.value
  }

  const setTrue = () => {
    value.value = true
  }

  const setFalse = () => {
    value.value = false
  }

  return {
    value,
    setFalse,
    setTrue,
    toggle,
  }
}
