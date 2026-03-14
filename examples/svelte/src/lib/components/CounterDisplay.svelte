<script lang="ts">
  interface Props {
    initialValue?: number
    min?: number
    max?: number
  }

  let { initialValue = 0, min = 0, max = 10 }: Props = $props()

  // Use $state with a default value, then sync in $effect
  let count = $state(0)

  // Sync count when initialValue changes
  $effect(() => {
    count = initialValue
  })

  let isMin = $derived(count <= min)
  let isMax = $derived(count >= max)

  function increment(): void {
    if (count + 1 <= max) {
      count++
    }
  }

  function decrement(): void {
    if (count - 1 >= min) {
      count--
    }
  }

  function reset(): void {
    count = min
  }
</script>

<div class="counter">
  <h2>Counter Example</h2>
  <p class="count-value">{count}</p>
  <div class="counter-buttons">
    <button type="button" disabled={isMin} onclick={decrement}>
      -
    </button>
    <button type="button" onclick={reset}>
      Reset
    </button>
    <button type="button" disabled={isMax} onclick={increment}>
      +
    </button>
  </div>
  <p class="counter-status">
    {#if isMin}
      <span>At minimum value</span>
    {:else if isMax}
      <span>At maximum value</span>
    {:else}
      <span>Counting...</span>
    {/if}
  </p>
</div>

<style>
  .counter {
    text-align: center;
    padding: 20px;
    border: 2px solid #ff3e00;
    border-radius: 12px;
    max-width: 300px;
    margin: 20px auto;
  }

  .count-value {
    font-size: 48px;
    font-weight: bold;
    color: #ff3e00;
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
    background-color: #ff3e00;
    color: white;
    transition: background-color 0.2s;
  }

  .counter-buttons button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .counter-buttons button:hover:not(:disabled) {
    background-color: #d63500;
  }

  .counter-status {
    font-style: italic;
    color: #666;
  }
</style>
