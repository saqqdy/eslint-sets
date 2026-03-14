<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Counter',
  data() {
    return {
      count: 0,
      max: 10,
      min: 0,
    }
  },
  methods: {
    decrement(): void {
      if (this.count > this.min) {
        this.count--
      }
    },
    increment(): void {
      if (this.count < this.max) {
        this.count++
      }
    },
    reset(): void {
      this.count = this.min
    },
  },
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
        :disabled="count <= min"
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
        :disabled="count >= max"
        @click="increment"
      >
        +
      </button>
    </div>
    <p class="counter-status">
      <span v-if="count <= min">At minimum value</span>
      <span v-else-if="count >= max">At maximum value</span>
      <span v-else>Counting...</span>
    </p>
  </div>
</template>

<style scoped>
.counter {
  text-align: center;
  padding: 20px;
  border: 2px solid #42b883;
  border-radius: 12px;
  max-width: 300px;
  margin: 20px auto;
}

.count-value {
  font-size: 48px;
  font-weight: bold;
  color: #42b883;
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
  background-color: #42b883;
  color: white;
  transition: background-color 0.2s;
}

.counter-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.counter-buttons button:hover:not(:disabled) {
  background-color: #35a572;
}

.counter-status {
  font-style: italic;
  color: #666;
}
</style>
