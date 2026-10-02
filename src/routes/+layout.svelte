<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { initAuth } from '$lib/stores';
  import { initCart } from '$lib/cart';
  import { a11y, initA11y } from '$lib/a11y';
  import { configured } from '$lib/supabase';
  import Header from '$lib/components/Header.svelte';
  import ContactFloat from '$lib/components/ContactFloat.svelte';
  import A11yPanel from '$lib/components/A11yPanel.svelte';

  onMount(() => { initA11y(); initCart(); return initAuth(); });

  $: if (typeof document !== 'undefined') {
    const r = document.documentElement;
    r.style.fontSize = $a11y.scale + '%';
    r.classList.toggle('hc', $a11y.contrast);
    r.classList.toggle('dys', $a11y.dyslexia);
    r.classList.toggle('sp', $a11y.spacing);
    r.classList.toggle('ul', $a11y.links);
    r.classList.toggle('nm', $a11y.motion);
  }
</script>

<a class="skip" href="#isi">Lewati ke konten utama</a>
<Header />
{#if !configured}
  <p class="wrap err" role="alert">Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY (lihat README).</p>
{/if}
<main id="isi"><slot /></main>
<footer class="wrap meta" style="padding-bottom:6rem">SobatTani — platform tanya jawab pertanian.</footer>
<A11yPanel />
<ContactFloat />
