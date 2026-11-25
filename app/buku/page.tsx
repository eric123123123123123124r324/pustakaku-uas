import Link from "next/link";
import { ambilDaftarBuku } from "@/lib/buku";
import { KATEGORI } from "@/lib/kategori";

type Param = string | string[] | undefined;
type Props = {
  searchParams: Promise<{ cari?: Param; kategori?: Param; stok?: Param }>;
};

function pertama(v: Param) {
  return (Array.isArray(v) ? v[0] : v)?.trim() ?? "";
}

export default async function DaftarBukuPage({ searchParams }: Props) {
  const sp = await searchParams;
  const cari = pertama(sp.cari);
  const kategori = pertama(sp.kategori);
  const stok = pertama(sp.stok);

  const daftar = await ambilDaftarBuku({ cari, kategori, stok });

  const inputClass = "rounded border border-gray-300 bg-white p-2 text-sm";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-xl font-bold">Daftar buku</h1>
        <Link
          href="/buku/baru"
          className="rounded bg-black px-3 py-2 text-sm text-white hover:bg-gray-800"
        >
          + Tambah buku
        </Link>
      </div>

      <form
        action="/buku"
        method="get"
        className="mb-4 flex flex-col gap-2 sm:flex-row"
      >
        <input
          name="cari"
          defaultValue={cari}
          placeholder="Cari judul atau penulis"
          className={`${inputClass} w-full sm:flex-1`}
        />
        <select name="kategori" defaultValue={kategori} className={inputClass}>
          <option value="">Semua kategori</option>
          {KATEGORI.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <select name="stok" defaultValue={stok} className={inputClass}>
          <option value="">Semua stok</option>
          <option value="tersedia">Tersedia</option>
          <option value="kosong">Kosong</option>
        </select>
        <button className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800">
          Cari
        </button>
      </form>

      <div className="overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">Judul</th>
              <th className="p-3">Penulis</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Stok</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {daftar.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  Tidak ada buku yang cocok.
                </td>
              </tr>
            ) : (
              daftar.map((b, i) => (
                <tr key={b.id}>
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{b.judul}</td>
                  <td className="p-3">{b.penulis}</td>
                  <td className="p-3">{b.kategori}</td>
                  <td className="p-3">
                    {b.stokTersedia === 0 ? (
                      <span className="rounded bg-red-100 px-2 py-0.5 text-red-700">
                        {b.stokTersedia}/{b.stokTotal}
                      </span>
                    ) : (
                      <span>
                        {b.stokTersedia}/{b.stokTotal}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/buku/${b.id}`}
                      className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}