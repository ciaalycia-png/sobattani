<script>
  import { infoTiles } from '$lib/data';
</script>

<svelte:head><title>Informasi pertanian — SobatTani</title></svelte:head>

<div class="wrap">
  <h1>Informasi pertanian</h1>
  <p class="meta">Pengingat singkat untuk bertani. Untuk kasus di lahan Anda, ajukan pertanyaan agar dijawab langsung.</p>
  <div class="grid">
    {#each infoTiles as i}<div class="card"><h2 style="font-size:1.2rem">{i.title}</h2><p style="margin:0">{i.text}</p></div>{/each}
  </div>
  <p style="margin-top:1.5rem"><a class="btn" href="/artikel">Baca artikel pertanian</a></p>
</div>
