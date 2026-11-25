import FormBuku from "@/components/FormBuku";

export default function FormTambahPage() {
  return (
    <div className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
      <h1 className="mb-4 text-lg font-bold">Tambah buku baru</h1>
      <FormBuku />
    </div>
  );
}