'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-gray-300 hover:text-white focus:outline-none p-2"
      >
        {/* Hamburger Icon */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-900 border-b border-gray-800 shadow-xl py-4 px-6 flex flex-col space-y-4 z-50">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white font-medium border-b border-gray-800 pb-2">Beranda</Link>
          <Link href="/history" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white font-medium border-b border-gray-800 pb-2">Riwayat Pembelian</Link>
          <Link href="/order-status" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white font-medium border-b border-gray-800 pb-2">Cek Pesanan</Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="text-blue-400 font-medium">Login Admin</Link>
        </div>
      )}
    </div>
  );
}
