<script lang="ts">
import Vue from 'vue'
import Counter from './components/Counter.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Counter,
  },
})
</script>

<template>
  <div id="app">
    <h1>Vue 2 + ESLint Sets Example</h1>
    <Counter />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
