"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { KATEGORI } from "@/lib/kategori";

export type FormState = {
  pesan: string;
  galat?: {
    judul?: string;
    penulis?: string;
    kategori?: string;
    tahun?: string;
    stok?: string;
  };
  values?: {
    judul: string;
    penulis: string;
    kategori: string;
    tahun: string;
    stok: string;
    deskripsi: string;
  };
};

export async function simpanBuku(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const values = {
    judul: String(formData.get("judul") ?? "").trim(),
    penulis: String(formData.get("penulis") ?? "").trim(),
    kategori: String(formData.get("kategori") ?? "").trim(),
    tahun: String(formData.get("tahun") ?? "").trim(),
    stok: String(formData.get("stok") ?? "").trim(),
    deskripsi: String(formData.get("deskripsi") ?? "").trim(),
  };

  const galat: NonNullable<FormState["galat"]> = {};

  if (!values.judul) galat.judul = "Judul wajib diisi";
  else if (values.judul.length > 150) galat.judul = "Judul maksimal 150 karakter";

  if (!values.penulis) galat.penulis = "Penulis wajib diisi";
  else if (values.penulis.length > 100) galat.penulis = "Penulis maksimal 100 karakter";

  if (!values.kategori) galat.kategori = "Kategori wajib dipilih";
  else if (!KATEGORI.includes(values.kategori)) galat.kategori = "Kategori tidak valid";

  let tahun: number | null = null;
  if (values.tahun) {
    const t = Number(values.tahun);
    if (!Number.isInteger(t) || t < 1000 || t > new Date().getFullYear()) {
      galat.tahun = "Tahun tidak valid";
    } else {
      tahun = t;
    }
  }

  const stok = Number(values.stok);
  if (!values.stok) galat.stok = "Jumlah stok wajib diisi";
  else if (!Number.isInteger(stok) || stok < 0 || stok > 10000) {
    galat.stok = "Stok harus bilangan bulat 0 sampai 10000";
  }

  if (Object.keys(galat).length > 0) {
    return { pesan: "Periksa kembali isian Anda.", galat, values };
  }

  let idBaru: number;
  try {
    const baru = await prisma.buku.create({
      data: {
        judul: values.judul,
        penulis: values.penulis,
        kategori: values.kategori,
        tahun,
        stokTotal: stok,
        stokTersedia: stok,
        deskripsi: values.deskripsi || null,
      },
    });
    idBaru = baru.id;
  } catch (error) {
    console.error("Gagal menyimpan buku:", error);
    return { pesan: "Terjadi kesalahan di server. Coba lagi.", values };
  }

  // redirect() harus di luar try/catch
  revalidatePath("/buku");
  redirect(`/buku/${idBaru}`);
}