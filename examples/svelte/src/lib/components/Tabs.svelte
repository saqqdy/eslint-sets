<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Tab {
    id: string
    label: string
    disabled?: boolean
  }

  interface TabsProps {
    tabs: Tab[]
    defaultTab?: string
    onChange?: (tabId: string) => void
    children: Snippet<{ activeTab: string }>
  }

  let { tabs, defaultTab, onChange, children }: TabsProps = $props()

  let activeTab = $state<string | undefined>(undefined)

  // Set default tab when tabs change or on first render
  $effect(() => {
    if (activeTab === undefined) {
      activeTab = defaultTab ?? tabs[0]?.id ?? ''
    }
  })

  function setActiveTab(tabId: string): void {
    const tab = tabs.find((t) => t.id === tabId)
    if (tab && !tab.disabled) {
      activeTab = tabId
      onChange?.(tabId)
    }
  }

  function handleKeydown(event: KeyboardEvent): void {
    const enabledTabs = tabs.filter((t) => !t.disabled)
    const currentIndex = enabledTabs.findIndex((t) => t.id === activeTab)

    switch (event.key) {
      case 'ArrowLeft': {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1
        setActiveTab(enabledTabs[prevIndex].id)
        break
      }
      case 'ArrowRight': {
        const nextIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0
        setActiveTab(enabledTabs[nextIndex].id)
        break
      }
      case 'Home':
        setActiveTab(enabledTabs[0].id)
        break
      case 'End':
        setActiveTab(enabledTabs[enabledTabs.length - 1].id)
        break
    }
  }
</script>

<div class="tabs">
  <div
    class="tabs-list"
    role="tablist"
    tabindex={0}
    onkeydown={handleKeydown}
  >
    {#each tabs as tab (tab.id)}
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === tab.id}
        aria-controls="tabpanel-{tab.id}"
        disabled={tab.disabled}
        class="tab-button"
        class:active={activeTab === tab.id}
        class:disabled={tab.disabled}
        onclick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>
  <div
    class="tabs-content"
    role="tabpanel"
    id="tabpanel-{activeTab}"
    aria-labelledby={activeTab}
  >
    {@render children({ activeTab })}
  </div>
</div>

<style>
  .tabs {
    width: 100%;
  }

  .tabs-list {
    border-bottom: 1px solid #ddd;
    display: flex;
    gap: 0;
  }

  .tab-button {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    padding: 10px 20px;
    transition: border-color 0.2s;
  }

  .tab-button.active {
    border-bottom-color: #42b883;
  }

  .tab-button.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .tab-button:hover:not(.disabled) {
    background-color: #f5f5f5;
  }

  .tabs-content {
    padding: 20px 0;
  }
</style>
