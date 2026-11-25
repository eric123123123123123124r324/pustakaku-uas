# PustakaKu

Aplikasi web pencatatan buku perpustakaan SMA.
Stack: Next.js (App Router), TypeScript, Tailwind CSS, Prisma 6, SQLite.

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

`npm install` otomatis membuat Prisma Client dan database SQLite
(`prisma/dev.db`) lewat migrasi. Data contoh (9 buku) terisi otomatis
saat halaman daftar pertama kali dibuka. Tidak ada langkah tambahan.

## Halaman

| Rute | Keterangan |
|---|---|
| / | Landing page dan tombol ke daftar buku |
| /buku | Daftar buku, cari judul/penulis, filter kategori dan stok |
| /buku/[id] | Detail buku |
| /buku/baru | Form tambah buku |

## Fitur

- Pencarian judul atau penulis, filter kategori dan ketersediaan stok
- Stok berwarna merah jika kosong
- Validasi form di server, isian tidak hilang saat galat
- Halaman loading dan 404 (rute dan data tidak ditemukan)

## Struktur folder

```
app/                 halaman dan layout (App Router)
  buku/              daftar, detail [id], form baru, server action
components/          Navbar, FormBuku
lib/prisma.ts        koneksi Prisma tunggal
lib/buku.ts          query dan seed otomatis
lib/kategori.ts      daftar kategori
prisma/              schema.prisma dan migrations
```

## Database

Tabel `Buku`: id, judul, penulis, kategori, tahun, stokTotal,
stokTersedia, deskripsi, createdAt. Lihat isi database dengan
`npx prisma studio`.