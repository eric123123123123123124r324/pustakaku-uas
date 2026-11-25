import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-bold">
          PustakaKu
        </Link>
        <ul className="flex items-center gap-4 text-sm">
          <li>
            <Link href="/" className="hover:underline">Beranda</Link>
          </li>
          <li>
            <Link href="/buku" className="hover:underline">Daftar Buku</Link>
          </li>
          <li>
            <Link href="/buku/baru" className="hover:underline">Tambah Buku</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}