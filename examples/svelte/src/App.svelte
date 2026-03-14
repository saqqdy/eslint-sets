<script lang="ts">
  let count = $state(0)

  function increment(): void {
    count += 1
  }
</script>

<main>
  <h1>Svelte Counter</h1>
  <p>Count: {count}</p>
  <button type="button" onclick={increment}>
    Increment
  </button>
</main>

<style>
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
