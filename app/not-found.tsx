import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded border border-gray-200 bg-white p-6 text-center">
      <h1 className="text-xl font-bold">Halaman tidak ditemukan</h1>
      <Link href="/" className="mt-3 inline-block text-blue-600 underline">
        Kembali ke beranda
      </Link>
    </div>
  );
}