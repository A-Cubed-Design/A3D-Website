<script>
  import TypeButton from './TypeButton.svelte';

  const types = [
    { name: 'FDM', imgUrl: './assets/unsplash-royalty-free-printer-1.jpg' },
    { name: 'Resin', imgUrl: './assets/pixabay-royalty-free-printer-1.jpg' },
    { name: 'Laser', imgUrl: './assets/pixabay-royalty-free-printer-2.jpg' },
  ];
</script>

<div class="type-container">
  {#each types as type (type.name)}
    <TypeButton {type} />
  {/each}
</div>

<style>
  .type-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;
    flex-grow: 1;
    gap: 10px;
  }
</style>