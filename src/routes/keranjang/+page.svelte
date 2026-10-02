<script>
  import { lines, total, setQty, clear } from '$lib/cart';
  import { contact, rp } from '$lib/data';

  let nama = '', alamat = '', catatan = '', error = '';

  function checkout() {
    if (!nama.trim() || !alamat.trim()) { error = 'Isi nama dan alamat pengiriman dulu.'; return; }
    error = '';
    const rows = $lines.map((p) => `- ${p.name} (${p.unit}) x${p.qty} = ${rp(p.price * p.qty)}`).join('\n');
    const text = `Halo, saya ingin memesan:\n${rows}\n\nTotal: ${rp($total)}\nNama: ${nama}\nAlamat: ${alamat}${catatan ? '\nCatatan: ' + catatan : ''}`;
    window.open(`${contact.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }
</script>

<svelte:head><title>Keranjang — SobatTani</title></svelte:head>

<div class="wrap" style="max-width:46rem">
  <h1>Keranjang</h1>
  {#if !$lines.length}
    <p class="card">Keranjang masih kosong. <a href="/toko">Belanja di toko tani</a>.</p>
  {:else}
    <ul class="items">
      {#each $lines as p (p.id)}
        <li class="card item">
          <img src={p.img} alt="" />
          <div class="info">
            <strong>{p.name}</strong>
            <span class="meta">{p.unit} · {rp(p.price)}</span>
            <strong>{rp(p.price * p.qty)}</strong>
          </div>
          <div class="qty">
            <button class="btn alt" aria-label="Kurangi {p.name}" on:click={() => setQty(p.id, p.qty - 1)}>−</button>
            <input type="number" min="1" max="99" value={p.qty} aria-label="Jumlah {p.name}" on:change={(e) => setQty(p.id, +e.currentTarget.value)} />
            <button class="btn alt" aria-label="Tambah {p.name}" on:click={() => setQty(p.id, p.qty + 1)}>+</button>
            <button class="btn alt" on:click={() => setQty(p.id, 0)}>Hapus</button>
          </div>
        </li>
      {/each}
    </ul>

    <p class="sum"><span>Total</span> <strong>{rp($total)}</strong></p>

    <form class="f card" on:submit|preventDefault={checkout}>
      <h2>Data pengiriman</h2>
      <label>Nama penerima <input bind:value={nama} required /></label>
      <label>Alamat lengkap <textarea rows="3" bind:value={alamat} required></textarea></label>
      <label>Catatan (opsional) <input bind:value={catatan} /></label>
      {#if error}<p class="err" role="alert">{error}</p>{/if}
      <button class="btn">Pesan via WhatsApp</button>
      <p class="meta" style="margin:0">Rincian pesanan dikirim ke WhatsApp {contact.name}. Ongkir dan pembayaran disepakati lewat chat.</p>
    </form>
    <p><button class="btn alt" on:click={clear}>Kosongkan keranjang</button></p>
  {/if}
</div>

<style>
  .items { list-style: none; padding: 0; display: grid; gap: .8rem; }
  .item { display: flex; flex-wrap: wrap; gap: .8rem; align-items: center; }
  .item img { width: 5.5rem; border-radius: .5rem; }
  .info { display: grid; flex: 1 1 10rem; }
  .qty { display: flex; flex-wrap: wrap; gap: .3rem; align-items: center; }
  .qty input { width: 4.5rem; text-align: center; }
  .sum { display: flex; justify-content: space-between; font-size: 1.3rem; margin: 1rem 0; }
</style>
