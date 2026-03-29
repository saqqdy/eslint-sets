import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export interface MousePosition {
  x: Ref<number>
  y: Ref<number>
  sourceType: Ref<'mouse' | 'touch' | null>
}

export function useMouse(): MousePosition {
  const x = ref(0)
  const y = ref(0)
  const sourceType = ref<'mouse' | 'touch' | null>(null)

  const handleMouseMove = (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY
    sourceType.value = 'mouse'
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      x.value = event.touches[0].clientX
      y.value = event.touches[0].clientY
      sourceType.value = 'touch'
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('touchmove', handleTouchMove)
  })

  return { sourceType, x, y }
}
