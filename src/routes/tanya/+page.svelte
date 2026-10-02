<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import { user, authReady } from '$lib/stores';
  import { categories } from '$lib/data';

  let f = { title: '', description: '', farmer_name: '', region: '', commodity: '', category: '' };
  let file = null, error = '', busy = false;

  function pick(e) {
    const x = e.target.files[0];
    error = '';
    if (!x) { file = null; return; }
    if (!x.type.startsWith('image/')) { error = 'File harus berupa gambar.'; e.target.value = ''; return; }
    if (x.size > 3 * 1024 * 1024) { error = 'Ukuran foto maksimal 3 MB.'; e.target.value = ''; return; }
    file = x;
  }

  async function submit() {
    busy = true; error = '';
    let image_url = null;
    if (file) {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
      const path = `${$user.id}/${Date.now()}.${ext}`;
      const { error: ue } = await supabase.storage.from('question-images').upload(path, file);
      if (ue) { error = 'Gagal mengunggah foto: ' + ue.message; busy = false; return; }
      image_url = supabase.storage.from('question-images').getPublicUrl(path).data.publicUrl;
    }
    const { data, error: e } = await supabase.from('questions').insert({ ...f, image_url, user_id: $user.id }).select('id').single();
    busy = false;
    if (e) error = 'Gagal menyimpan: ' + e.message; else goto('/pertanyaan/' + data.id);
  }
</script>

<svelte:head><title>Ajukan pertanyaan — SobatTani</title></svelte:head>

<div class="wrap" style="max-width:40rem">
  <h1>Ajukan pertanyaan</h1>
  {#if !$authReady}<p>Memuat…</p>
  {:else if !$user}<p class="card">Silakan <a href="/masuk">masuk</a> dulu untuk mengajukan pertanyaan.</p>
  {:else}
    <form class="f" on:submit|preventDefault={submit}>
      <label>Judul pertanyaan <input bind:value={f.title} required maxlength="150" /></label>
      <label>Deskripsi <textarea rows="6" bind:value={f.description} required></textarea></label>
      <div class="row">
        <label>Nama tani / kelompok tani <input bind:value={f.farmer_name} /></label>
        <label>Wilayah / daerah <input bind:value={f.region} placeholder="Contoh: Kab. Bekasi, Jawa Barat" /></label>
      </div>
      <div class="row">
        <label>Komoditas <input bind:value={f.commodity} placeholder="Contoh: cabai, padi" /></label>
        <label>Kategori
          <select bind:value={f.category} required><option value="" disabled>Pilih kategori</option>{#each categories as c}<option>{c}</option>{/each}</select>
        </label>
      </div>
      <label>Foto (opsional, maks. 3 MB) <input type="file" accept="image/*" on:change={pick} /></label>
      {#if error}<p class="err" role="alert">{error}</p>{/if}
      <button class="btn" disabled={busy}>{busy ? 'Mengirim…' : 'Kirim pertanyaan'}</button>
    </form>
  {/if}
</div>
