'use client';

import { createOrder } from '@/app/actions/orderActions';
import { useState } from 'react';

export default function OrderForm({ productId, price }: { productId: string, price: number }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('productId', productId);
    formData.append('price', price.toString());
    
    try {
      await createOrder(formData);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
        Account Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">Nomor WhatsApp (Aktif)</label>
          <input 
            type="text" 
            name="userId" 
            required
            className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="08123456789"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
          <input 
            type="email" 
            name="email" 
            required
            className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="For order receipt"
          />
        </div>

        <div className="pt-4 border-t border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
            Select Quantity
          </h2>
          <div className="flex items-center space-x-4">
            <button 
              type="button" 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              -
            </button>
            <input 
              type="number" 
              name="quantity" 
              value={quantity}
              readOnly
              className="w-20 bg-gray-950 border border-gray-700 rounded-lg px-4 py-2 text-center text-white"
            />
            <button 
              type="button" 
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              +
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
           <div className="flex justify-between items-center mb-6">
             <span className="text-gray-400 font-medium">Total Payment:</span>
             <span className="text-2xl font-bold text-blue-500">Rp {(price * quantity).toLocaleString('id-ID')}</span>
           </div>

           <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
          <p className="text-center text-xs text-gray-500 mt-4">
            By placing an order, you agree to our Terms of Service. Your order will be placed as Pending and you will pay later.
          </p>
        </div>
      </form>
    </div>
  );
}
