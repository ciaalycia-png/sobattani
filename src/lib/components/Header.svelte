<script>
  import { page } from '$app/stores';
  import { user } from '$lib/stores';
  import { count } from '$lib/cart';
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation';

  const links = [['/', 'Beranda'], ['/tanya', 'Ajukan pertanyaan'], ['/informasi', 'Informasi'], ['/artikel', 'Artikel'], ['/toko', 'Toko tani']];
  async function logout() { await supabase.auth.signOut(); goto('/'); }
</script>

<header>
  <div class="wrap bar">
    <a href="/" class="logo">SobatTani</a>
    <nav aria-label="Menu utama">
      {#each links as [href, label]}
        <a {href} aria-current={$page.url.pathname === href ? 'page' : undefined}>{label}</a>
      {/each}
      <a href="/keranjang" aria-label="Keranjang, {$count} barang">Keranjang{#if $count}<span class="badge">{$count}</span>{/if}</a>
      {#if $user}
        <button class="btn alt" on:click={logout}>Keluar</button>
      {:else}
        <a class="btn" href="/masuk">Masuk</a>
      {/if}
    </nav>
  </div>
</header>

<style>
  header { background: var(--g900); color: #fff; }
  .bar { display: flex; flex-wrap: wrap; gap: .75rem 1.5rem; align-items: center; justify-content: space-between; padding-top: .8rem; padding-bottom: .8rem; }
  .logo { font-family: var(--head); font-weight: 800; font-size: 1.5rem; color: var(--sun); text-decoration: none; }
  nav { display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: center; }
  nav a:not(.btn) { color: #fff; text-decoration: none; padding: .2rem 0; border-bottom: 3px solid transparent; }
  .badge { background: var(--sun); color: #000; border-radius: 99px; padding: 0 .5rem; margin-left: .35rem; font-weight: 700; font-size: .85rem; }
  nav a[aria-current] { border-color: var(--sun); }
  nav :global(.btn.alt) { color: #fff; border-color: #fff; }
</style>
