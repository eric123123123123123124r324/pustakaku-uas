"use client";

import Link from "next/link";
import { useActionState } from "react";
import { simpanBuku, type FormState } from "@/app/buku/action";
import { KATEGORI } from "@/lib/kategori";

const awal: FormState = { pesan: "" };

const inputClass = "mt-1 w-full rounded border border-gray-300 bg-white p-2 text-sm";
const labelClass = "block text-sm font-medium";
const galatClass = "mt-1 text-sm text-red-600";

export default function FormBuku() {
  const [state, formAction, pending] = useActionState(simpanBuku, awal);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="judul" className={labelClass}>Judul *</label>
        <input id="judul" name="judul" placeholder="Judul buku"
          defaultValue={state.values?.judul} className={inputClass} />
        {state.galat?.judul && <p className={galatClass}>{state.galat.judul}</p>}
      </div>

      <div>
        <label htmlFor="penulis" className={labelClass}>Penulis *</label>
        <input id="penulis" name="penulis" placeholder="Nama penulis"
          defaultValue={state.values?.penulis} className={inputClass} />
        {state.galat?.penulis && <p className={galatClass}>{state.galat.penulis}</p>}
      </div>

      <div>
        <label htmlFor="kategori" className={labelClass}>Kategori *</label>
        <select id="kategori" name="kategori"
          defaultValue={state.values?.kategori ?? ""} className={inputClass}>
          <option value="">Pilih kategori</option>
          {KATEGORI.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        {state.galat?.kategori && <p className={galatClass}>{state.galat.kategori}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tahun" className={labelClass}>Tahun terbit</label>
          <input id="tahun" name="tahun" type="number" placeholder="2005"
            defaultValue={state.values?.tahun} className={inputClass} />
          {state.galat?.tahun && <p className={galatClass}>{state.galat.tahun}</p>}
        </div>
        <div>
          <label htmlFor="stok" className={labelClass}>Jumlah stok *</label>
          <input id="stok" name="stok" type="number" placeholder="5"
            defaultValue={state.values?.stok} className={inputClass} />
          {state.galat?.stok && <p className={galatClass}>{state.galat.stok}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="deskripsi" className={labelClass}>Deskripsi</label>
        <textarea id="deskripsi" name="deskripsi" rows={3} placeholder="Deskripsi buku"
          defaultValue={state.values?.deskripsi} className={inputClass} />
      </div>

      {state.pesan && <p className="text-sm text-red-600">{state.pesan}</p>}

      <div className="flex items-center justify-between">
        <Link href="/buku"
          className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
          Batal
        </Link>
        <button type="submit" disabled={pending}
          className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50">
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}