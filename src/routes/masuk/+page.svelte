<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';

  let mode = 'masuk', email = '', password = '', msg = '', error = '', busy = false;

  async function submit() {
    busy = true; error = ''; msg = '';
    if (mode === 'masuk') {
      const { error: e } = await supabase.auth.signInWithPassword({ email, password });
      if (e) error = e.message; else goto('/');
    } else {
      const { data, error: e } = await supabase.auth.signUp({ email, password });
      if (e) error = e.message;
      else if (data.session) goto('/');
      else msg = 'Pendaftaran berhasil. Cek email Anda untuk konfirmasi, lalu masuk.';
    }
    busy = false;
  }
</script>

<svelte:head><title>{mode === 'masuk' ? 'Masuk' : 'Daftar'} — SobatTani</title></svelte:head>

<div class="wrap" style="max-width:28rem">
  <h1>{mode === 'masuk' ? 'Masuk' : 'Daftar akun'}</h1>
  <form class="f card" on:submit|preventDefault={submit}>
    <label>Email <input type="email" bind:value={email} required autocomplete="email" /></label>
    <label>Kata sandi (minimal 6 karakter) <input type="password" bind:value={password} required minlength="6" autocomplete={mode === 'masuk' ? 'current-password' : 'new-password'} /></label>
    {#if error}<p class="err" role="alert">{error}</p>{/if}
    {#if msg}<p class="ok" role="status">{msg}</p>{/if}
    <button class="btn" disabled={busy}>{busy ? 'Memproses…' : mode === 'masuk' ? 'Masuk' : 'Daftar'}</button>
  </form>
  <p>
    {#if mode === 'masuk'}Belum punya akun? <button class="btn alt" on:click={() => (mode = 'daftar')}>Daftar</button>
    {:else}Sudah punya akun? <button class="btn alt" on:click={() => (mode = 'masuk')}>Masuk</button>{/if}
  </p>
</div>
