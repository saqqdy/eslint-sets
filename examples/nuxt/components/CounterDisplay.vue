<script setup lang="ts">
import { useCounter } from '../composables/useCounter'

const props = withDefaults(
  defineProps<{
    initialValue?: number
    max?: number
    min?: number
  }>(),
  {
    initialValue: 0,
    max: 10,
    min: 0,
  },
)

const { count, increment, decrement, reset, isMin, isMax } = useCounter({
  initialValue: props.initialValue,
  max: props.max,
  min: props.min,
  step: 1,
})
</script>

<template>
  <div class="counter">
    <h2>Counter Example</h2>
    <p class="count-value">
      {{ count }}
    </p>
    <div class="counter-buttons">
      <button
        type="button"
        :disabled="isMin"
        @click="decrement"
      >
        -
      </button>
      <button
        type="button"
        @click="reset"
      >
        Reset
      </button>
      <button
        type="button"
        :disabled="isMax"
        @click="increment"
      >
        +
      </button>
    </div>
    <p class="counter-status">
      <span v-if="isMin">At minimum value</span>
      <span v-else-if="isMax">At maximum value</span>
      <span v-else>Counting...</span>
    </p>
  </div>
</template>

<style scoped>
.counter {
  text-align: center;
  padding: 20px;
  border: 2px solid #00dc82;
  border-radius: 12px;
  max-width: 300px;
  margin: 20px auto;
}

.count-value {
  font-size: 48px;
  font-weight: bold;
  color: #00dc82;
}

.counter-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 16px 0;
}

.counter-buttons button {
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #00dc82;
  color: white;
  transition: background-color 0.2s;
}

.counter-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.counter-buttons button:hover:not(:disabled) {
  background-color: #00b86e;
}

.counter-status {
  font-style: italic;
  color: #666;
}
</style>
