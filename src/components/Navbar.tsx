import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        <Link href="/" className="text-2xl font-bold text-white tracking-wider flex items-center">
          <span className="text-blue-500">IKF</span>STORE
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">Beranda</Link>
          <Link href="/history" className="text-gray-300 hover:text-white transition-colors font-medium">Riwayat Pembelian</Link>
          <Link href="/order-status" className="text-gray-300 hover:text-white transition-colors font-medium">Cek Pesanan</Link>
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors font-medium text-sm px-3 py-1 bg-gray-800 rounded-md border border-gray-700">Login</Link>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </nav>
  );
}
