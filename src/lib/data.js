export const categories = ['Hama tanaman', 'Bibit unggul', 'Hidroponik', 'Pascapanen', 'Pupuk organik', 'Penyakit tanaman', 'Alat pertanian', 'Lainnya'];

export const contact = {
  name: 'Alycia Margareta',
  phoneDisplay: '0895325798865',
  wa: 'https://wa.me/62895325798865',
  instagram: 'https://instagram.com/aldarasyarn',
  instagramHandle: 'aldarasyarn',
  email: 'tulipalycia@gmail.com'
};

export const articles = [
  { slug: 'pht', img: '/img/padi.svg', title: 'Mengenal Pengendalian Hama Terpadu (PHT)', summary: 'Cara mengendalikan hama dengan beberapa langkah, tanpa bergantung pada pestisida kimia saja.', body: ['PHT menggabungkan beberapa cara agar hama terkendali tanpa bergantung pada pestisida kimia saja.', 'Mulai dari pengamatan rutin di lahan, pemilihan varietas tahan hama, menjaga kebersihan lahan, memanfaatkan musuh alami, hingga pestisida sebagai pilihan terakhir.', 'Catat hama yang muncul dan tingkat kerusakannya supaya keputusan tindakan lebih tepat.'] },
  { slug: 'kompos', img: '/img/panen.svg', title: 'Membuat pupuk organik dari limbah dapur dan kebun', summary: 'Sisa sayur dan daun kering bisa menjadi kompos yang menyuburkan tanah.', body: ['Sisa sayur, daun kering, dan kotoran ternak dapat diolah menjadi kompos.', 'Cacah bahan agar cepat terurai, campur bahan hijau (basah) dan cokelat (kering), jaga kelembapan seperti spons yang diperas, lalu balik tumpukan secara berkala.', 'Kompos matang berwarna gelap, gembur, dan tidak berbau menyengat.'] },
  { slug: 'hidroponik', img: '/img/hidroponik.svg', title: 'Hidroponik sederhana untuk pemula', summary: 'Mulai bertanam tanpa tanah dengan sistem sumbu atau rakit apung.', body: ['Sistem sumbu (wick) dan rakit apung (DFT sederhana) cocok untuk memulai karena murah dan perawatannya mudah.', 'Sayuran daun seperti kangkung, selada, dan pakcoy tumbuh cepat dan cocok untuk percobaan pertama.', 'Perhatikan larutan nutrisi, kebersihan wadah, dan cahaya matahari yang cukup.'] },
  { slug: 'bibit-unggul', img: '/img/cabai.svg', title: 'Memilih bibit unggul untuk lahan Anda', summary: 'Pilih benih yang sesuai wilayah, musim, dan tujuan tanam.', body: ['Pilih varietas yang cocok dengan ketinggian lahan, musim tanam, dan ketersediaan air.', 'Beli benih bersertifikat atau dari penangkar yang jelas, lalu periksa tanggal kedaluwarsa dan daya tumbuhnya.', 'Semai terlebih dahulu dan pindahkan hanya bibit yang sehat dan seragam.'] },
  { slug: 'pascapanen', img: '/img/panen.svg', title: 'Penanganan pascapanen agar hasil tidak cepat rusak', summary: 'Panen di waktu yang tepat dan simpan dengan benar untuk menekan kerugian.', body: ['Panen pada tingkat kematangan yang sesuai, sebaiknya pagi hari saat suhu belum panas.', 'Pisahkan hasil yang rusak, bersihkan, lalu simpan di tempat teduh dan berventilasi baik.', 'Gunakan wadah yang tidak menekan hasil panen agar tidak memar.'] },
  { slug: 'pemupukan-padi', img: '/img/padi.svg', title: 'Dasar pemupukan tanaman padi', summary: 'Kenali kebutuhan hara dan waktu pemberian pupuk yang seimbang.', body: ['Pemupukan berimbang memakai nitrogen, fosfor, dan kalium sesuai kondisi tanah.', 'Pupuk diberikan bertahap: dasar saat tanam dan susulan mengikuti fase pertumbuhan.', 'Uji tanah atau tanya penyuluh setempat untuk dosis yang tepat di lahan Anda.'] }
];

export const infoTiles = [
  { title: 'Musim tanam', text: 'Sesuaikan jenis tanaman dengan musim hujan dan kemarau di daerah Anda.' },
  { title: 'Kesehatan tanah', text: 'Tambahkan bahan organik secara rutin agar tanah gembur dan subur.' },
  { title: 'Air yang cukup', text: 'Atur penyiraman dan drainase supaya akar tidak kekurangan atau terendam air.' },
  { title: 'Pantau hama', text: 'Periksa tanaman secara berkala agar hama dan penyakit ditangani sejak awal.' }
];

export const gallery = [
  { src: '/img/padi.svg', alt: 'Hamparan padi menguning', cap: 'Padi' },
  { src: '/img/cabai.svg', alt: 'Tanaman cabai berbuah merah', cap: 'Cabai' },
  { src: '/img/hidroponik.svg', alt: 'Sayuran hidroponik pada rakit', cap: 'Hidroponik' },
  { src: '/img/panen.svg', alt: 'Keranjang hasil panen', cap: 'Hasil panen' }
];

export const rp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');

// Harga di bawah adalah contoh. Ubah sesuai harga toko Anda.
export const products = [
  { id: 'padi', type: 'Bibit', name: 'Benih padi', unit: '1 kg', price: 30000, img: '/img/padi.svg', note: 'Pilih varietas sesuai wilayah dan musim tanam.' },
  { id: 'cabai', type: 'Bibit', name: 'Benih cabai rawit', unit: '10 g', price: 25000, img: '/img/cabai.svg', note: 'Untuk lahan terbuka maupun polybag.' },
  { id: 'jagung', type: 'Bibit', name: 'Benih jagung manis', unit: '250 g', price: 35000, img: '/img/bibit.svg', note: 'Jagung manis untuk konsumsi segar.' },
  { id: 'tomat', type: 'Bibit', name: 'Bibit tomat', unit: 'paket 10 bibit', price: 20000, img: '/img/bibit.svg', note: 'Bibit sudah disemai, siap pindah tanam.' },
  { id: 'sayur', type: 'Bibit', name: 'Benih kangkung dan selada', unit: 'paket', price: 12000, img: '/img/hidroponik.svg', note: 'Cocok untuk tanam di polybag dan hidroponik.' },
  { id: 'cangkul', type: 'Alat', name: 'Cangkul', unit: '1 pcs', price: 85000, img: '/img/alat.svg', note: 'Alat dasar untuk mengolah lahan.' },
  { id: 'sabit', type: 'Alat', name: 'Sabit', unit: '1 pcs', price: 35000, img: '/img/alat.svg', note: 'Untuk panen padi dan memotong rumput.' },
  { id: 'sprayer', type: 'Alat', name: 'Sprayer elektrik 16 L', unit: '1 unit', price: 350000, img: '/img/alat.svg', note: 'Menyemprot pupuk cair dan perawatan tanaman.' },
  { id: 'gunting', type: 'Alat', name: 'Gunting pangkas', unit: '1 pcs', price: 60000, img: '/img/alat.svg', note: 'Untuk memangkas tanaman buah dan hias.' },
  { id: 'hidro', type: 'Alat', name: 'Paket hidroponik pemula', unit: '1 paket', price: 150000, img: '/img/hidroponik.svg', note: 'Net pot, rockwool, dan rak sederhana.' }
];

export function fmtDate(d) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
