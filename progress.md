# Progress

## Sudah dibuat
- Kerangka SvelteKit + adapter Vercel, konfigurasi Supabase lewat environment variable
- Login dan daftar (email + kata sandi) dengan Supabase Auth
- Ajukan pertanyaan: judul, deskripsi, nama tani/kelompok tani, wilayah, komoditas, kategori, foto opsional (storage Supabase, maks. 3 MB)
- Beranda: hero dengan kolom pencarian, daftar pertanyaan, filter kategori, jumlah jawaban
- Halaman pertanyaan + jawaban; penjawab mengisi nama, profesi, instansi, wilayah
- Aksesibilitas: ukuran huruf 100–200%, kontras tinggi, huruf ramah disleksia, jarak teks, garis bawah tautan, kurangi animasi, tautan lewati konten, label form
- Kontak person melayang (Alycia Margareta): WhatsApp, Instagram @aldarasyarn, email tulipalycia@gmail.com
- Beranda: galeri 4 gambar pertanian (padi, cabai, hidroponik, hasil panen), bagian informasi, dan 3 artikel terbaru
- Halaman Artikel (6 artikel) dengan halaman baca per artikel; halaman Informasi berisi 4 tips singkat
- Toko tani ala marketplace: 10 produk (bibit dan alat) dengan harga, cari dan filter, tombol masuk keranjang
- Keranjang: ubah jumlah, hapus, total harga, tersimpan di browser; checkout lewat pesan WhatsApp berisi rincian pesanan
- Tema hijau, font Fraunces + Atkinson Hyperlegible
- Skema database, RLS, dan storage di `supabase/schema.sql`
- README cara deploy

## Belum / catatan
- Hero dan gambar galeri/artikel masih ilustrasi SVG di `static/` (belum foto asli, lihat README)
- Belum diuji dengan `npm install` dan build di sini (tanpa akses internet); uji lokal dulu
- Harga produk di `src/lib/data.js` hanyalah contoh; belum ada pembayaran online, stok, atau pesanan tersimpan di database
- Belum ada: edit/hapus pertanyaan dari UI, jawaban terbaik, pagination, katalog produk dari database
