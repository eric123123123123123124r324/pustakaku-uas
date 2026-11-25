import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-gray-200 bg-white p-6 text-center sm:p-12">
        <h1 className="text-3xl font-bold sm:text-4xl">PustakaKu</h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          Aplikasi web sederhana untuk mencatat buku perpustakaan SMA. Tidak
          perlu lagi pencatatan manual di buku tulis: semua data buku tersimpan
          rapi dan mudah dicari.
        </p>
        <Link
          href="/buku"
          className="mt-6 inline-block rounded bg-black px-6 py-3 text-white hover:bg-gray-800"
        >
          Lihat Daftar Buku
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="font-semibold">Daftar buku</h2>
          <p className="mt-1 text-sm text-gray-600">
            Lihat semua buku beserta penulis, kategori, dan sisa stok.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="font-semibold">Cari cepat</h2>
          <p className="mt-1 text-sm text-gray-600">
            Cari berdasarkan judul atau penulis, lalu saring menurut kategori.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="font-semibold">Tambah buku</h2>
          <p className="mt-1 text-sm text-gray-600">
            Catat buku baru lewat form sederhana, datanya langsung tersimpan.
          </p>
        </div>
      </section>
    </div>
  );
}