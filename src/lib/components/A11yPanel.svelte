<script>
  import { a11y, defaults } from '$lib/a11y';
  let open = false;
  const step = (d) => a11y.update((v) => ({ ...v, scale: Math.min(200, Math.max(100, v.scale + d)) }));
  const toggles = [['contrast', 'Kontras tinggi'], ['dyslexia', 'Huruf ramah disleksia'], ['spacing', 'Jarak teks lebih lebar'], ['links', 'Garis bawah pada tautan'], ['motion', 'Kurangi animasi']];
</script>

<div class="ap">
  <button class="btn" aria-expanded={open} aria-controls="a11y-panel" on:click={() => (open = !open)}>Aksesibilitas</button>
  {#if open}
    <div id="a11y-panel" class="panel card" role="region" aria-label="Pengaturan aksesibilitas">
      <label for="fs">Ukuran huruf: {$a11y.scale}%</label>
      <div class="sz">
        <button class="btn alt" on:click={() => step(-10)} aria-label="Perkecil huruf">A−</button>
        <input id="fs" type="range" min="100" max="200" step="10" bind:value={$a11y.scale} />
        <button class="btn alt" on:click={() => step(10)} aria-label="Perbesar huruf">A+</button>
      </div>
      {#each toggles as [key, label]}
        <label class="chk"><input type="checkbox" bind:checked={$a11y[key]} /> {label}</label>
      {/each}
      <button class="btn alt" on:click={() => a11y.set({ ...defaults })}>Atur ulang</button>
    </div>
  {/if}
</div>

<style>
  .ap { position: fixed; left: 1rem; bottom: 1rem; z-index: 50; display: flex; flex-direction: column-reverse; gap: .6rem; max-width: calc(100vw - 9rem); }
  .panel { display: grid; gap: .6rem; max-height: 70vh; overflow: auto; box-shadow: 0 6px 20px rgba(0,0,0,.25); border: 2px solid var(--g700); }
  .sz { display: grid; grid-template-columns: auto 1fr auto; gap: .5rem; align-items: center; }
  .sz input { padding: 0; }
  .chk { display: flex; gap: .5rem; align-items: center; font-weight: 400; }
  .chk input { width: 1.2rem; height: 1.2rem; }
</style>
