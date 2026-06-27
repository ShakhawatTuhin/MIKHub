<script>
  export let current;
  export let total;
  export let onPrev;
  export let onNext;
</script>

<div class="controls">

  <button
    class="circle"
    on:click={onPrev}
  >
    ←
  </button>

  <button
    class="circle"
    on:click={onNext}
  >
    →
  </button>

  <div class="dots">
    {#each Array(total) as _, index}
      <div
        class:active={index === current}
        class="dot"
      />
    {/each}
  </div>

</div>

<style>
  .controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
  }

  .circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;

    border: 1px solid rgba(255,255,255,.25);

    background: transparent;

    color: white;

    cursor: pointer;
  }

  .dots {
    display: flex;
    gap: .5rem;
  }

  .dot {
    width: 20px;
    height: 4px;

    background: rgba(255,255,255,.3);

    border-radius: 999px;
  }

  .dot.active {
    background: #17b8ff;
  }
</style>