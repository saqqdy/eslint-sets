<script setup lang="ts">
const count = ref(0)

function increment(): void {
  count.value++
}
</script>

<template>
  <main>
    <h1>Nuxt Counter</h1>
    <p>Count: {{ count }}</p>
    <button
      type="button"
      @click="increment"
    >
      Increment
    </button>
  </main>
</template>

<style scoped>
main {
  text-align: center;
  padding: 2rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
