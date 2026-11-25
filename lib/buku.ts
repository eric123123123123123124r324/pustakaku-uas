import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const DATA_AWAL = [
  { judul: "Laskar Pelangi", penulis: "Andrea Hirata", kategori: "Novel", tahun: 2005, stokTotal: 5, stokTersedia: 3, deskripsi: "Kisah sepuluh anak di Belitung yang berjuang mengejar pendidikan di sekolah sederhana." },
  { judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", kategori: "Novel", tahun: 1980, stokTotal: 2, stokTersedia: 0, deskripsi: "Novel sejarah tentang Minke di masa kolonial Hindia Belanda." },
  { judul: "Fisika Dasar", penulis: "David Halliday", kategori: "Sains", tahun: 2010, stokTotal: 2, stokTersedia: 2, deskripsi: "Buku teks pengantar mekanika, gelombang, listrik, dan magnet." },
  { judul: "Sapiens", penulis: "Yuval Noah Harari", kategori: "Sejarah", tahun: 2011, stokTotal: 4, stokTersedia: 1, deskripsi: "Ringkasan sejarah umat manusia dari masa purba hingga kini." },
  { judul: "Algoritma dan Pemrograman", penulis: "Rinaldi Munir", kategori: "Teknologi", tahun: 2016, stokTotal: 3, stokTersedia: 3, deskripsi: "Pengantar logika pemrograman dan algoritma dasar." },
  { judul: "Sejarah Indonesia Modern 1200-2008", penulis: "M.C. Ricklefs", kategori: "Sejarah", tahun: 2008, stokTotal: 3, stokTersedia: 0, deskripsi: "Penelusuran sejarah Indonesia dari abad ke-13 sampai era modern." },
  { judul: "Kimia Dasar", penulis: "Raymond Chang", kategori: "Sains", tahun: 2012, stokTotal: 6, stokTersedia: 4, deskripsi: "Konsep inti kimia untuk siswa dan mahasiswa tahun pertama." },
  { judul: "Laut Bercerita", penulis: "Leila S. Chudori", kategori: "Novel", tahun: 2017, stokTotal: 4, stokTersedia: 2, deskripsi: "Novel tentang aktivis mahasiswa yang hilang di akhir 1990-an." },
  { judul: "Kamus Besar Bahasa Indonesia", penulis: "Badan Bahasa", kategori: "Lainnya", tahun: null, stokTotal: 2, stokTersedia: 2, deskripsi: null },
];

const globalForSeed = globalThis as typeof globalThis & {
  bukuSeedPromise?: Promise<void>;
};

async function seedJikaKosong() {
  const jumlah = await prisma.buku.count();
  if (jumlah > 0) return;
  await prisma.buku.createMany({ data: DATA_AWAL });
}

export async function pastikanSeed() {
  if (!globalForSeed.bukuSeedPromise) {
    globalForSeed.bukuSeedPromise = seedJikaKosong().catch((error: unknown) => {
      globalForSeed.bukuSeedPromise = undefined;
      throw error;
    });
  }

  return globalForSeed.bukuSeedPromise;
}

export async function ambilDaftarBuku(filter: {
  cari: string;
  kategori: string;
  stok: string;
}) {
  await pastikanSeed();

  const where: Prisma.BukuWhereInput = {};
  if (filter.cari) {
    where.OR = [
      { judul: { contains: filter.cari } },
      { penulis: { contains: filter.cari } },
    ];
  }
  if (filter.kategori) where.kategori = filter.kategori;
  if (filter.stok === "tersedia") where.stokTersedia = { gt: 0 };
  if (filter.stok === "kosong") where.stokTersedia = 0;

  return prisma.buku.findMany({ where, orderBy: { id: "asc" } });
}

export async function ambilBuku(id: number) {
  await pastikanSeed();
  return prisma.buku.findUnique({ where: { id } });
}