import Link from "next/link";

export default function BukuTidakDitemukan() {
  return (
    <div className="rounded border border-gray-200 bg-white p-6 text-center">
      <h1 className="text-xl font-bold">Buku tidak ditemukan</h1>
      <p className="mt-2 text-gray-600">
        Buku dengan ID tersebut tidak ada di database.
      </p>
      <Link
        href="/buku"
        className="mt-4 inline-block rounded bg-black px-4 py-2 text-sm text-white"
      >
        Kembali ke daftar
      </Link>
    </div>
  );
}