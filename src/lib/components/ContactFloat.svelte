<script>
  import { contact } from '$lib/data';
  let open = false;
</script>

<div class="cp">
  {#if open}
    <div class="panel" role="region" aria-label="Kontak person">
      <strong>{contact.name}</strong>
      <span class="meta">Kontak person SobatTani</span>
      <a href={contact.wa} target="_blank" rel="noopener">WhatsApp {contact.phoneDisplay}</a>
      <a href={contact.instagram} target="_blank" rel="noopener">Instagram @{contact.instagramHandle}</a>
      <a href="mailto:{contact.email}">{contact.email}</a>
    </div>
  {/if}
  <button class="fab" aria-expanded={open} on:click={() => (open = !open)}>{open ? 'Tutup' : 'WA saya'}</button>
</div>

<style>
  .cp { position: fixed; right: 1rem; bottom: 1rem; z-index: 50; display: grid; justify-items: end; gap: .6rem; }
  .fab { background: #25a244; color: #fff; border: 3px solid #fff; border-radius: 99px; padding: .7rem 1.2rem; font: inherit; font-weight: 700; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,.3); animation: bob 2.6s ease-in-out infinite; }
  :global(html.hc) .fab { background: #000; color: #ffe600; border-color: #ffe600; }
  .panel { background: var(--card); color: var(--text); border: 2px solid var(--g700); border-radius: .8rem; padding: 1rem; display: grid; gap: .35rem; max-width: min(90vw, 20rem); box-shadow: 0 6px 20px rgba(0,0,0,.25); }
  .panel a { word-break: break-word; }
  @keyframes bob { 50% { transform: translateY(-5px); } }
</style>
