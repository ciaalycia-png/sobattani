<script>
  import { products, contact, rp } from '$lib/data';
  import { add, cart } from '$lib/cart';

  let q = '', tab = 'Semua', msg = '';
  const tabs = ['Semua', 'Bibit', 'Alat'];
  $: shown = products.filter((p) => (tab === 'Semua' || p.type === tab) && (!q || p.name.toLowerCase().includes(q.toLowerCase())));

  function addTo(p) { add(p.id); msg = `${p.name} ditambahkan ke keranjang.`; }
</script>

<svelte:head><title>Toko tani — SobatTani</title></svelte:head>

<div class="wrap">
  <h1>Toko tani</h1>
  <p class="meta">Bibit dan alat pertanian. Pesanan dikonfirmasi lewat WhatsApp {contact.name}.</p>

  <div class="bar">
    <label class="sr" for="cari-toko">Cari produk</label>
    <input id="cari-toko" type="search" placeholder="Cari produk…" bind:value={q} />
    <div class="tabs" role="group" aria-label="Kategori produk">
      {#each tabs as t}<button class="btn {tab === t ? '' : 'alt'}" aria-pressed={tab === t} on:click={() => (tab = t)}>{t}</button>{/each}
    </div>
    <a class="btn alt" href="/keranjang">Lihat keranjang</a>
  </div>
  <p class="ok" role="status" aria-live="polite">{msg}</p>

  {#if !shown.length}<p class="card">Produk tidak ditemukan.</p>{/if}
  <div class="grid">
    {#each shown as p (p.id)}
      <div class="card prod">
        <img src={p.img} alt="" loading="lazy" />
        <span class="tag">{p.type}</span>
        <h2>{p.name}</h2>
        <p class="meta" style="margin:0">{p.unit}</p>
        <p class="price">{rp(p.price)}</p>
        <p class="meta" style="margin-top:0">{p.note}</p>
        <button class="btn" on:click={() => addTo(p)}>
          + Keranjang{#if $cart[p.id]} ({$cart[p.id]}){/if}
        </button>
      </div>
    {/each}
  </div>
</div>

<style>
  .bar { display: flex; flex-wrap: wrap; gap: .6rem; align-items: center; margin: 1rem 0 .4rem; }
  .bar input { flex: 1 1 14rem; width: auto; }
  .tabs { display: flex; gap: .4rem; }
  .sr { position: absolute; left: -999px; }
  .prod { display: flex; flex-direction: column; gap: .15rem; }
  .prod img { width: 100%; aspect-ratio: 400 / 260; object-fit: cover; border-radius: .5rem; margin-bottom: .5rem; }
  .prod h2 { font-size: 1.15rem; margin: .2rem 0 0; }
  .prod .btn { margin-top: auto; }
  .price { font-weight: 700; font-size: 1.3rem; color: #c2410c; margin: .3rem 0; }
  :global(html.hc) .price { color: #ffe600; }
</style>
