<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

interface ModalProps {
  isOpen: boolean
  title?: string
}

interface ModalEmits {
  (e: 'close'): void
}

const props = defineProps<ModalProps>()
const emit = defineEmits<ModalEmits>()

const modalRef: Ref<HTMLDivElement | null> = ref(null)

function handleClose(): void {
  emit('close')
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.isOpen) {
    handleClose()
  }
}

function handleBackdropClick(event: MouseEvent): void {
  if (event.target === event.currentTarget) {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

// Prevent body scroll when modal is open
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-backdrop"
        @click="handleBackdropClick"
      >
        <div
          ref="modalRef"
          class="modal-content"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'modal-title' : undefined"
        >
          <button
            type="button"
            class="modal-close"
            aria-label="Close modal"
            @click="handleClose"
          >
            ×
          </button>
          <h2
            v-if="title"
            id="modal-title"
            class="modal-title"
          >
            {{ title }}
          </h2>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  padding: 20px;
  position: relative;
  width: 90%;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
}

.modal-title {
  margin-bottom: 16px;
  margin-right: 30px;
}

.modal-body {
  margin-top: 10px;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
