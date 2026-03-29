<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'UserCard',
  props: {
    user: {
      type: Object as () => {
        email: string
        id: number
        name: string
        role: 'admin' | 'user' | 'guest'
      },
      required: true,
    },
    showEmail: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    displayName(): string {
      return this.user.name.toUpperCase()
    },
    roleClass(): string {
      return `badge-${this.user.role}`
    },
  },
  methods: {
    handleSelect(): void {
      this.$emit('select', this.user)
    },
    handleDelete(): void {
      this.$emit('delete', this.user.id)
    },
  },
})
</script>

<template>
  <div class="user-card">
    <div class="user-header">
      <span class="user-name">
        {{ displayName }}
      </span>
      <span class="role-badge" :class="[roleClass]">
        {{ user.role }}
      </span>
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
  margin: 8px;
  min-width: 200px;
}

.user-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.user-name {
  font-weight: bold;
}

.role-badge {
  border-radius: 4px;
  font-size: 12px;
  padding: 2px 8px;
}

.badge-admin {
  background-color: #ff4d4f;
  color: white;
}

.badge-user {
  background-color: #1890ff;
  color: white;
}

.badge-guest {
  background-color: #d9d9d9;
  color: #333;
}

.user-email {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.user-actions {
  display: flex;
  gap: 8px;
}

.user-actions button {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-select {
  background-color: #42b883;
  color: white;
}

.btn-delete {
  background-color: #ff4d4f;
  color: white;
}
</style>
