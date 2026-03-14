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
  <div class="text-center p-5 border-2 border-blue-500 rounded-xl max-w-75 mx-auto my-5">
    <h2 class="text-xl font-bold mb-4">
      Counter Example
    </h2>
    <p class="text-5xl font-bold text-blue-500 mb-4">
      {{ count }}
    </p>
    <div class="flex justify-center gap-3 mb-4">
      <button
        type="button"
        class="px-6 py-3 text-lg border-none rounded-lg cursor-pointer bg-blue-500 text-white transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 disabled:hover:bg-gray-300"
        :disabled="isMin"
        @click="decrement"
      >
        -
      </button>
      <button
        type="button"
        class="px-6 py-3 text-lg border-none rounded-lg cursor-pointer bg-blue-500 text-white transition-colors duration-200 hover:bg-blue-600"
        @click="reset"
      >
        Reset
      </button>
      <button
        type="button"
        class="px-6 py-3 text-lg border-none rounded-lg cursor-pointer bg-blue-500 text-white transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 disabled:hover:bg-gray-300"
        :disabled="isMax"
        @click="increment"
      >
        +
      </button>
    </div>
    <p class="italic text-gray-500">
      <span v-if="isMin">At minimum value</span>
      <span v-else-if="isMax">At maximum value</span>
      <span v-else>Counting...</span>
    </p>
  </div>
</template>
