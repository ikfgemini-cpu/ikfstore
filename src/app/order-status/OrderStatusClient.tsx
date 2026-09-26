'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderStatusClient({ initialOrderId, initialOrder, settings }: any) {
  const [orderId, setOrderId] = useState(initialOrderId || '');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) {
      router.push(`/order-status?id=${orderId}`);
    }
  };

  const payViaWhatsApp = () => {
    if (!settings?.whatsappNumber || !initialOrder) return;
    const text = `Hello, I want to confirm payment for my order.\nOrder ID: ${initialOrder.id}\nProduct: ${initialOrder.product.name}\nTotal: Rp ${initialOrder.totalPrice.toLocaleString('id-ID')}`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="mb-10 w-full max-w-lg mx-auto flex gap-3">
        <input 
          type="text" 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter your Order ID"
          className="flex-grow bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
          Search
        </button>
      </form>

      {initialOrderId && !initialOrder && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl text-center">
          Order not found. Please check your Order ID.
        </div>
      )}

      {initialOrder && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl w-full">
          {initialOrder.status === 'PENDING' && (
            <div className="mb-6 bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-400 font-bold text-sm md:text-base">⚠️ PENTING: SIMPAN DAN COPY ID ORDER ANDA!</p>
              <p className="text-gray-300 text-xs md:text-sm mt-1">Anda memerlukan ID Order ini untuk mengecek status dan melakukan pembayaran nanti.</p>
            </div>
          )}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-800 pb-6">
            <div>
              <p className="text-gray-400 text-sm">Order ID</p>
              <h2 className="text-xl font-mono text-white mt-1">{initialOrder.id}</h2>
            </div>
            <div className="mt-4 md:mt-0">
               <span className={`px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase
                 ${initialOrder.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' : ''}
                 ${initialOrder.status === 'APPROVED' ? 'bg-blue-500/20 text-blue-500' : ''}
                 ${initialOrder.status === 'COMPLETED' ? 'bg-green-500/20 text-green-500' : ''}
                 ${initialOrder.status === 'REJECTED' ? 'bg-red-500/20 text-red-500' : ''}
               `}>
                 {initialOrder.status}
               </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Product</p>
                <p className="text-lg font-medium text-white">{initialOrder.product.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Nomor WhatsApp</p>
                <p className="text-lg font-medium text-white">{initialOrder.userId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Quantity</p>
                <p className="text-lg font-medium text-white">{initialOrder.quantity}</p>
              </div>
            </div>
            <div className="bg-gray-950 p-6 rounded-xl flex flex-col justify-center items-center">
              <p className="text-gray-400 text-sm mb-2">Total Payment</p>
              <p className="text-3xl font-bold text-blue-500">Rp {initialOrder.totalPrice.toLocaleString('id-ID')}</p>
            </div>
          </div>

          {initialOrder.status === 'PENDING' && (
             <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-xl text-center">
               <h3 className="text-yellow-500 font-bold text-lg mb-2">Waiting for Approval</h3>
               <p className="text-gray-300">Your order is being reviewed by the admin. Please refresh this page later to check if it has been approved. Once approved, you will see payment options here.</p>
             </div>
          )}

          {initialOrder.status === 'APPROVED' && (
             <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl">
               <h3 className="text-blue-400 font-bold text-xl mb-6 text-center">Please Complete Your Payment</h3>
               
               <div className="grid md:grid-cols-2 gap-8">
                 <div className="flex flex-col items-center border-r-0 md:border-r border-gray-800 pr-0 md:pr-8">
                   <h4 className="text-white font-medium mb-4">Pay via QRIS</h4>
                   {settings?.qrisImageUrl ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <img src={settings.qrisImageUrl} alt="QRIS" className="w-48 h-48 bg-white p-2 rounded-lg object-contain" />
                   ) : (
                     <div className="w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-center p-4">
                       QRIS Not Configured
                     </div>
                   )}
                   <p className="text-xs text-gray-400 mt-4 text-center">Scan the QR code with your mobile banking or e-wallet app.</p>
                 </div>
                 
                 <div className="flex flex-col items-center justify-center">
                    <h4 className="text-white font-medium mb-6">Or Pay via WhatsApp</h4>
                    <button 
                      onClick={payViaWhatsApp}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-colors w-full flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.004 2c-5.465 0-9.92 4.417-9.92 9.873 0 1.93.535 3.824 1.558 5.485l-1.42 5.068 5.253-1.365a9.882 9.882 0 004.53 1.09h.004c5.463 0 9.919-4.418 9.919-9.875C21.928 6.818 17.467 2 12.004 2zm0 18.067c-1.636 0-3.238-.432-4.643-1.25l-.333-.195-3.45.897.925-3.32-.214-.337a8.211 8.211 0 01-1.282-4.437c0-4.572 3.791-8.293 8.441-8.293 4.65 0 8.441 3.722 8.441 8.294 0 4.571-3.79 8.293-8.441 8.293h-.001a8.272 8.272 0 01-4.443-1.651z"/>
                      </svg>
                      Contact Admin
                    </button>
                    <p className="text-xs text-gray-400 mt-4 text-center">Click to chat with us. We will guide you through the payment process.</p>
                 </div>
               </div>
             </div>
          )}
          
          {initialOrder.status === 'COMPLETED' && (
             <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl text-center">
               <h3 className="text-green-500 font-bold text-lg mb-2">Order Completed</h3>
               <p className="text-gray-300">Thank you for your purchase! Your digital product has been delivered to your account.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
