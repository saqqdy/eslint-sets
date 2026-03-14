<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { User } from '../utils/helpers'

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  showEmail: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'select', user: User): void
  (e: 'delete', userId: number): void
}>()

const displayName = computed(() => {
  return props.user.name.toUpperCase()
})

const roleBadgeClass = computed(() => {
  return `badge-${props.user.role}`
})

function handleSelect() {
  emit('select', props.user)
}

function handleDelete() {
  emit('delete', props.user.id)
}
</script>

<template>
  <div class="user-card">
    <div class="user-header">
      <span class="user-name">{{ displayName }}</span>
      <span
        class="role-badge"
        :class="[roleBadgeClass]"
      >{{ user.role }}</span>
    </div>
    <p
      v-if="showEmail"
      class="user-email"
    >
      {{ user.email }}
    </p>
    <div class="user-actions">
      <button
        type="button"
        class="btn-select"
        @click="handleSelect"
      >
        Select
      </button>
      <button
        type="button"
        class="btn-delete"
        @click="handleDelete"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-name {
  font-weight: bold;
  font-size: 18px;
}

.role-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  text-transform: uppercase;
}

.badge-admin {
  background-color: #ff4757;
  color: white;
}

.badge-user {
  background-color: #2ed573;
  color: white;
}

.badge-guest {
  background-color: #747d8c;
  color: white;
}

.user-email {
  color: #666;
  margin: 8px 0;
}

.user-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.btn-select,
.btn-delete {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-select {
  background-color: #3742fa;
  color: white;
}

.btn-delete {
  background-color: #ff4757;
  color: white;
}
</style>
