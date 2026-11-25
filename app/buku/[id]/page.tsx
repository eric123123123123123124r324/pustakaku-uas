import Link from "next/link";
import { notFound } from "next/navigation";
import { ambilBuku } from "@/lib/buku";

export default async function DetailBukuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const nomor = Number(id);
  if (!Number.isInteger(nomor) || nomor < 1) notFound();

  const buku = await ambilBuku(nomor);
  if (!buku) notFound();

  const habis = buku.stokTersedia === 0;

  return (
    <div>
      <Link href="/buku" className="text-sm text-gray-600 hover:underline">
        &lsaquo; Kembali ke daftar
      </Link>

      <div className="mt-4 flex flex-col gap-6 rounded border border-gray-200 bg-white p-4 sm:flex-row">
        <div className="flex h-56 w-full shrink-0 items-center justify-center rounded bg-gray-200 text-sm text-gray-500 sm:w-40">
          Sampul
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{buku.judul}</h1>
          <p className="text-sm">Penulis: {buku.penulis}</p>
          <p className="text-sm">
            Kategori: {buku.kategori} &middot; Tahun: {buku.tahun ?? "-"}
          </p>
          <p className="text-sm">
            Stok:{" "}
            <span
              className={`rounded px-2 py-0.5 ${
                habis ? "bg-red-100 text-red-700" : "bg-green-100 text-green-800"
              }`}
            >
              {buku.stokTersedia} dari {buku.stokTotal} tersedia
            </span>
          </p>
          <p className="pt-2 text-sm text-gray-700">
            {buku.deskripsi ?? "Belum ada deskripsi."}
          </p>
        </div>
      </div>
    </div>
  );
}