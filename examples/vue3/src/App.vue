<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <div class="app">
    <h1>Vue 3 + ESLint Sets Example</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">
      Increment
    </button>
  </div>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
