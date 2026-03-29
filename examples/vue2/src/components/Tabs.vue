<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Tabs',
  props: {
    tabs: {
      type: Array as () => Array<{ id: string; label: string; disabled?: boolean }>,
      required: true,
    },
    defaultTab: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeTab: this.defaultTab || (this.tabs.length > 0 ? this.tabs[0].id : ''),
    }
  },
  computed: {
    activeTabIndex(): number {
      return this.tabs.findIndex((tab) => tab.id === this.activeTab)
    },
  },
  watch: {
    defaultTab(newVal: string) {
      if (newVal && this.tabs.some((t) => t.id === newVal)) {
        this.activeTab = newVal
      }
    },
  },
  methods: {
    setActiveTab(tabId: string): void {
      const tab = this.tabs.find((t) => t.id === tabId)
      if (tab && !tab.disabled) {
        this.activeTab = tabId
        this.$emit('change', tabId)
      }
    },
    handleKeydown(event: KeyboardEvent): void {
      const enabledTabs = this.tabs.filter((t) => !t.disabled)
      const currentIndex = enabledTabs.findIndex((t) => t.id === this.activeTab)

      switch (event.key) {
        case 'ArrowLeft': {
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1
          this.setActiveTab(enabledTabs[prevIndex].id)
          break
        }
        case 'ArrowRight': {
          const nextIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0
          this.setActiveTab(enabledTabs[nextIndex].id)
          break
        }
        case 'Home':
          this.setActiveTab(enabledTabs[0].id)
          break
        case 'End':
          this.setActiveTab(enabledTabs[enabledTabs.length - 1].id)
          break
      }
    },
  },
})
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
