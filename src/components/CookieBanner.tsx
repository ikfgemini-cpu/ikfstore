'use client';

import { acceptCookies } from '@/app/actions/cookieActions';
import { useState } from 'react';

export default function CookieBanner({ hasConsented }: { hasConsented: boolean }) {
  const [show, setShow] = useState(!hasConsented);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50 shadow-2xl">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="text-sm text-gray-300 mb-4 sm:mb-0 mr-4">
          Kami menggunakan cookies untuk menyimpan <strong>Riwayat Pembelian</strong> Anda di perangkat ini agar Anda mudah mengecek status pesanan kembali. Dengan melanjutkan, Anda menyetujui penggunaan cookies.
        </div>
        <div className="flex space-x-4 flex-shrink-0">
          <button 
            onClick={async () => {
              await acceptCookies();
              setShow(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
          >
            Accept Cookies
          </button>
          <button 
            onClick={() => setShow(false)}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
          >
            Tolak
          </button>
        </div>
      </div>
    </div>
  );
}
