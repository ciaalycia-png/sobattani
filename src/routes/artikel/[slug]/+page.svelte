<script>
  import { page } from '$app/stores';
  import { articles } from '$lib/data';
  $: a = articles.find((x) => x.slug === $page.params.slug);
</script>

<svelte:head><title>{a ? a.title : 'Artikel'} — SobatTani</title></svelte:head>

<div class="wrap" style="max-width:44rem">
  {#if a}
    <article>
      <h1>{a.title}</h1>
      <img src={a.img} alt="" style="width:100%;border-radius:.8rem" />
      {#each a.body as p}<p>{p}</p>{/each}
    </article>
    <p><a href="/artikel">Kembali ke semua artikel</a> · <a href="/tanya">Punya pertanyaan? Tanyakan di sini</a></p>
  {:else}
    <p class="card">Artikel tidak ditemukan. <a href="/artikel">Lihat semua artikel</a>.</p>
  {/if}
</div>
