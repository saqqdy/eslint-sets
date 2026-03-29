<script setup lang="ts">
import { computed, provide, ref, type Ref } from 'vue'

interface Tab {
  id: string
  label: string
  disabled?: boolean
}

interface TabsProps {
  defaultTab?: string
  tabs: Tab[]
}

interface TabsEmits {
  (e: 'change', tabId: string): void
}

const props = defineProps<TabsProps>()
const emit = defineEmits<TabsEmits>()

const activeTab: Ref<string> = ref(props.defaultTab ?? props.tabs[0]?.id ?? '')

const activeTabIndex = computed(() => {
  return props.tabs.findIndex((tab) => tab.id === activeTab.value)
})

function setActiveTab(tabId: string): void {
  const tab = props.tabs.find((t) => t.id === tabId)
  if (tab && !tab.disabled) {
    activeTab.value = tabId
    emit('change', tabId)
  }
}

function handleKeydown(event: KeyboardEvent): void {
  const tabs = props.tabs.filter((t) => !t.disabled)
  const currentIndex = tabs.findIndex((t) => t.id === activeTab.value)

  switch (event.key) {
    case 'ArrowLeft': {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
      setActiveTab(tabs[prevIndex].id)
      break
    }
    case 'ArrowRight': {
      const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
      setActiveTab(tabs[nextIndex].id)
      break
    }
    case 'Home':
      setActiveTab(tabs[0].id)
      break
    case 'End':
      setActiveTab(tabs[tabs.length - 1].id)
      break
  }
}

// Provide active tab to children
provide('activeTab', activeTab)
</script>

<template>
  <div class="tabs">
    <div
      class="tabs-list"
      role="tablist"
      @keydown="handleKeydown"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`tabpanel-${tab.id}`"
        :disabled="tab.disabled"
        class="tab-button" :class="[{ active: activeTab === tab.id, disabled: tab.disabled }]"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div
      class="tabs-content"
      role="tabpanel"
      :id="`tabpanel-${activeTab}`"
      :aria-labelledby="activeTab"
    >
      <slot :active-tab="activeTab" :active-index="activeTabIndex" />
    </div>
  </div>
</template>

<style scoped>
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
