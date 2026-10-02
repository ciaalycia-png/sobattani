# SobatTani

Website tanya jawab pertanian (ala StackOverflow). SvelteKit + Supabase (auth, database, storage) + Vercel.

## 1. Siapkan Supabase
1. Buat project di https://supabase.com.
2. Buka **SQL Editor**, tempel seluruh isi `supabase/schema.sql`, lalu **Run**. Ini membuat tabel `questions`, `answers`, aturan keamanan (RLS), dan bucket storage `question-images`.
3. Buka **Project Settings > API**, salin **Project URL** dan **anon public key**.
4. (Disarankan saat uji coba) **Authentication > Providers > Email**: matikan *Confirm email* agar daftar langsung masuk. Untuk produksi, biarkan aktif.
5. Setelah punya alamat Vercel, isi **Authentication > URL Configuration > Site URL** dengan alamat tersebut.

## 2. Jalankan di komputer (opsional)
```bash
npm install
copy .env.example .env      # Windows (Mac/Linux: cp)
# isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env
npm run dev
```

## 3. Deploy ke Vercel
**Cara A (disarankan): lewat GitHub**
1. Ekstrak zip ini, unggah isinya ke repository GitHub baru.
2. Di https://vercel.com/new, impor repository tersebut. Framework otomatis terdeteksi sebagai SvelteKit.
3. Di **Environment Variables**, tambahkan:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Klik **Deploy**.

**Cara B: lewat Vercel CLI**
```bash
npm i -g vercel
vercel          # ikuti petunjuk
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel --prod
```
Vercel tidak menerima unggahan zip langsung di dashboard, jadi gunakan salah satu cara di atas.

## Mengganti foto hero
Gambar depan ada di `static/hero.svg` (ilustrasi lahan). Untuk memakai foto asli, simpan sebagai `static/hero.jpg`, lalu ubah `url('/hero.svg')` menjadi `url('/hero.jpg')` di `src/routes/+page.svelte`.

## Harga dan produk toko
Daftar produk dan harga ada di `products` pada `src/lib/data.js` (harga bawaan hanyalah contoh). Keranjang disimpan di browser pembeli. Checkout mengirim rincian pesanan ke WhatsApp Alycia, jadi pembayaran dan pengiriman diatur manual lewat chat.

## Mengganti gambar galeri dan artikel
Gambar ada di `static/img/` (padi, cabai, hidroponik, panen). Ganti dengan foto Anda (jpg/png), lalu sesuaikan nama file di `gallery` dan `articles` pada `src/lib/data.js`.

## Mengubah kontak, artikel, dan produk
Semuanya ada di `src/lib/data.js`.
