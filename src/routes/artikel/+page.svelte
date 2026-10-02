<script>
  import { articles } from '$lib/data';
</script>

<svelte:head><title>Artikel pertanian — SobatTani</title></svelte:head>

<div class="wrap">
  <h1>Artikel pertanian</h1>
  <div class="grid">
    {#each articles as a (a.slug)}
      <a class="card" href="/artikel/{a.slug}" style="text-decoration:none;color:inherit">
        <img src={a.img} alt="" loading="lazy" style="width:100%;border-radius:.5rem;margin-bottom:.6rem" />
        <h2 style="font-size:1.2rem;color:var(--g700)">{a.title}</h2>
        <p class="meta" style="margin:0">{a.summary}</p>
      </a>
    {/each}
  </div>
</div>
