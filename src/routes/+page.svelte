<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import { categories, fmtDate, gallery, infoTiles, articles } from '$lib/data';

  let items = [], loading = true, error = '', q = '', cat = '';
  onMount(async () => {
    const { data, error: e } = await supabase.from('questions').select('*, answers(count)').order('created_at', { ascending: false });
    if (e) error = 'Gagal memuat pertanyaan: ' + e.message; else items = data;
    loading = false;
  });
  $: shown = items.filter((i) => (!cat || i.category === cat) && (!q || (i.title + ' ' + i.description + ' ' + (i.commodity || '')).toLowerCase().includes(q.toLowerCase())));
</script>

<svelte:head><title>SobatTani — Tanya jawab pertanian</title></svelte:head>

<section class="hero">
  <div class="wrap">
    <h1>Tanya apa saja soal pertanian</h1>
    <p>Ajukan pertanyaan tentang hama, bibit, pupuk, atau hidroponik. Petani, penyuluh, dan pakar lain menjawab.</p>
    <form class="search" role="search" on:submit|preventDefault>
      <label class="sr" for="cari">Cari pertanyaan</label>
      <input id="cari" type="search" placeholder="Cari: cabai, wereng, pupuk kompos…" bind:value={q} />
      <a class="btn" href="/tanya">Tanya sekarang</a>
    </form>
  </div>
</section>

<section class="wrap" style="margin-top:1.5rem" aria-label="Galeri pertanian">
  <ul class="gal">
    {#each gallery as g}
      <li><img src={g.src} alt={g.alt} loading="lazy" /><span>{g.cap}</span></li>
    {/each}
  </ul>
</section>

<div class="wrap" style="margin-top:1.5rem">
  <div class="row" style="align-items:end;margin-bottom:1rem">
    <h2>Pertanyaan terbaru</h2>
    <label>Kategori
      <select bind:value={cat}><option value="">Semua kategori</option>{#each categories as c}<option>{c}</option>{/each}</select>
    </label>
  </div>
  {#if loading}<p>Memuat…</p>
  {:else if error}<p class="err" role="alert">{error}</p>
  {:else if !shown.length}<p class="card">Belum ada pertanyaan yang cocok. <a href="/tanya">Jadilah yang pertama bertanya.</a></p>
  {:else}
    <ul class="list">
      {#each shown as it (it.id)}
        <li class="card">
          <h3><a href="/pertanyaan/{it.id}">{it.title}</a></h3>
          <div>
            {#if it.category}<span class="tag">{it.category}</span>{/if}
            {#if it.commodity}<span class="tag">{it.commodity}</span>{/if}
            {#if it.region}<span class="tag">{it.region}</span>{/if}
          </div>
          <p class="meta">{it.farmer_name ? it.farmer_name + ' · ' : ''}{fmtDate(it.created_at)} · {it.answers?.[0]?.count ?? 0} jawaban</p>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<section class="wrap" style="margin-top:2.5rem">
  <h2>Informasi pertanian</h2>
  <div class="grid">
    {#each infoTiles as i}<div class="card"><h3>{i.title}</h3><p style="margin:0">{i.text}</p></div>{/each}
  </div>
</section>

<section class="wrap" style="margin-top:2.5rem">
  <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:.5rem">
    <h2>Artikel pertanian</h2><a href="/artikel">Lihat semua artikel</a>
  </div>
  <div class="grid">
    {#each articles.slice(0, 3) as a (a.slug)}
      <a class="card art" href="/artikel/{a.slug}">
        <img src={a.img} alt="" loading="lazy" />
        <h3>{a.title}</h3>
        <p class="meta" style="margin:0">{a.summary}</p>
      </a>
    {/each}
  </div>
</section>

<style>
  .gal { list-style: none; padding: 0; margin: 0; display: grid; gap: .8rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); }
  .gal li { position: relative; border-radius: .8rem; overflow: hidden; border: 1px solid var(--line); }
  .gal img, .art img { display: block; width: 100%; aspect-ratio: 400 / 260; object-fit: cover; }
  .gal span { position: absolute; left: 0; bottom: 0; right: 0; padding: .4rem .7rem; background: rgba(18,48,28,.8); color: #fff; font-weight: 700; }
  .art { display: block; text-decoration: none; color: inherit; }
  .art img { border-radius: .5rem; margin-bottom: .6rem; }
  .art h3 { color: var(--g700); }
  .hero { background: linear-gradient(rgba(18,48,28,.55), rgba(18,48,28,.7)), url('/hero.svg') center/cover; color: #fff; padding: 4rem 0 3rem; }
  .hero h1 { color: #fff; font-size: 2.4rem; max-width: 22ch; }
  .hero p { max-width: 50ch; }
  .search { display: flex; flex-wrap: wrap; gap: .6rem; margin-top: 1.2rem; }
  .search input { flex: 1 1 14rem; }
  .sr { position: absolute; left: -999px; }
  .list { list-style: none; padding: 0; display: grid; gap: .8rem; }
  .list h3 { margin: 0 0 .4rem; }
</style>
