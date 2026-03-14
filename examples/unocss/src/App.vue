<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment(): void {
  count.value++
}
</script>

<template>
  <main class="text-center p-8">
    <h1 class="text-2xl font-bold mb-4">
      UnoCSS Counter
    </h1>
    <p class="mb-4">
      Count: {{ count }}
    </p>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
      @click="increment"
    >
      Increment
    </button>
  </main>
</template>
