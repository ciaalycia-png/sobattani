<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { supabase } from '$lib/supabase';
  import { user } from '$lib/stores';
  import { fmtDate } from '$lib/data';

  let q = null, answers = [], loading = true, error = '', formError = '', busy = false;
  let a = { author_name: '', profession: '', institution: '', region: '', body: '' };

  async function load() {
    const id = $page.params.id;
    const [r1, r2] = await Promise.all([
      supabase.from('questions').select('*').eq('id', id).single(),
      supabase.from('answers').select('*').eq('question_id', id).order('created_at')
    ]);
    if (r1.error) error = 'Pertanyaan tidak ditemukan.'; else { q = r1.data; answers = r2.data || []; }
    loading = false;
  }
  onMount(load);

  async function send() {
    busy = true; formError = '';
    const { error: e } = await supabase.from('answers').insert({ ...a, question_id: q.id, user_id: $user.id });
    busy = false;
    if (e) { formError = 'Gagal mengirim jawaban: ' + e.message; return; }
    a = { ...a, body: '' };
    await load();
  }
</script>

<svelte:head><title>{q ? q.title : 'Pertanyaan'} — SobatTani</title></svelte:head>

<div class="wrap" style="max-width:46rem">
  {#if loading}<p>Memuat…</p>
  {:else if error}<p class="err" role="alert">{error}</p>
  {:else}
    <article class="card">
      <h1>{q.title}</h1>
      <div>
        {#if q.category}<span class="tag">{q.category}</span>{/if}
        {#if q.commodity}<span class="tag">{q.commodity}</span>{/if}
        {#if q.region}<span class="tag">{q.region}</span>{/if}
      </div>
      <p style="white-space:pre-wrap">{q.description}</p>
      {#if q.image_url}<img src={q.image_url} alt="Foto dari penanya: {q.title}" style="max-width:100%;border-radius:.6rem" />{/if}
      <p class="meta">Ditanyakan oleh {q.farmer_name || 'Anonim'} · {fmtDate(q.created_at)}</p>
    </article>

    <h2 style="margin-top:1.5rem">{answers.length} jawaban</h2>
    {#each answers as x (x.id)}
      <section class="card" style="margin-bottom:.8rem">
        <p style="white-space:pre-wrap;margin-top:0">{x.body}</p>
        <p class="meta"><strong>{x.author_name}</strong> · {x.profession}{x.institution ? ', ' + x.institution : ''}{x.region ? ' · ' + x.region : ''} · {fmtDate(x.created_at)}</p>
      </section>
    {/each}

    <h2 style="margin-top:1.5rem">Tulis jawaban</h2>
    {#if !$user}<p class="card">Silakan <a href="/masuk">masuk</a> untuk menjawab.</p>
    {:else}
      <form class="f" on:submit|preventDefault={send}>
        <div class="row">
          <label>Nama <input bind:value={a.author_name} required /></label>
          <label>Profesi <input bind:value={a.profession} required placeholder="Contoh: Petani, Penyuluh, Dosen" /></label>
        </div>
        <div class="row">
          <label>Instansi / kelompok (opsional) <input bind:value={a.institution} /></label>
          <label>Wilayah (opsional) <input bind:value={a.region} /></label>
        </div>
        <label>Jawaban Anda <textarea rows="6" bind:value={a.body} required></textarea></label>
        {#if formError}<p class="err" role="alert">{formError}</p>{/if}
        <button class="btn" disabled={busy}>{busy ? 'Mengirim…' : 'Kirim jawaban'}</button>
      </form>
    {/if}
  {/if}
</div>
