'use client';

import { deleteProduct } from '@/app/actions/adminActions';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductList({ products }: { products: any[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    setDeletingId(id);
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {products.map(product => (
        <div key={product.id} className="flex items-center justify-between p-4 bg-gray-950 rounded-xl border border-gray-800">
          <div className="flex items-center space-x-4">
             {product.imageUrl ? (
               // eslint-disable-next-line @next/next/no-img-element
               <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-cover bg-gray-800" />
             ) : (
               <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 font-bold text-xl">
                 {product.name.charAt(0)}
               </div>
             )}
             <div>
               <h3 className="text-white font-bold">{product.name}</h3>
               <p className="text-sm text-gray-400">{product.category.name}</p>
               <p className="text-sm font-medium text-blue-400 mt-1">Rp {product.price.toLocaleString('id-ID')}</p>
             </div>
          </div>
          <div className="flex space-x-2">
            <Link 
              href={`/admin/products/${product.id}`}
              className="text-blue-500 hover:text-blue-400 p-2 rounded-lg hover:bg-blue-500/10 transition-colors"
              title="Edit Product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </Link>
            <button 
              onClick={() => handleDelete(product.id)}
              disabled={deletingId === product.id}
              className="text-red-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
              title="Delete Product"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      {products.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No products added yet.
        </div>
      )}
    </div>
  );
}
