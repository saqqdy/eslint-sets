<script setup lang="ts">
import type { UserStats } from '../utils/helpers'

defineProps<{
  stats: UserStats
}>()
</script>

<template>
  <div class="stats">
    <h3>Statistics</h3>
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-value">{{ stats.totalCount }}</span>
        <span class="stat-label">Total</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ stats.adminCount }}</span>
        <span class="stat-label">Admins</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ stats.userCount }}</span>
        <span class="stat-label">Users</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ stats.guestCount }}</span>
        <span class="stat-label">Guests</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.stats h3 {
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
}

.stat-label {
  color: #666;
  font-size: 0.875rem;
}
</style>
