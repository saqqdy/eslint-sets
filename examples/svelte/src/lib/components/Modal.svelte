<script lang="ts">
  import type { Snippet } from 'svelte'
  import { onMount } from 'svelte'

  interface ModalProps {
    isOpen: boolean
    title?: string
    children: Snippet
    onClose: () => void
  }

  let { isOpen, title, children, onClose }: ModalProps = $props()

  let modalRef: HTMLDivElement | undefined = $state()

  function handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape' && isOpen) {
      onClose()
    }
  }

  function handleBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  $effect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  })
</script>

<svelte:boundary>
  {#if isOpen}
    <div
      class="modal-backdrop"
      role="button"
      tabindex={-1}
      onclick={handleBackdropClick}
      onkeydown={(e) => e.key === 'Enter' && handleBackdropClick(e as unknown as MouseEvent)}
    >
      <div
        bind:this={modalRef}
        class="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <button
          type="button"
          class="modal-close"
          aria-label="Close modal"
          onclick={onClose}
        >
          ×
        </button>
        {#if title}
          <h2
            id="modal-title"
            class="modal-title"
          >
            {title}
          </h2>
        {/if}
        <div class="modal-body">
          {@render children()}
        </div>
      </div>
    </div>
  {/if}
</svelte:boundary>

<style>
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
</style>
