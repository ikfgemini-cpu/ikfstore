'use client';

import { createProduct, updateProduct } from '@/app/actions/adminActions';
import { useState } from 'react';

export default function ProductForm({ categories, initialData }: { categories: any[], initialData?: any }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      if (initialData) {
        await updateProduct(initialData.id, formData);
        alert('Product updated successfully!');
      } else {
        await createProduct(formData);
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2">Product Name</label>
        <input 
          type="text" 
          name="name" 
          defaultValue={initialData?.name}
          required
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="e.g. Mobile Legends Diamonds"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2">Category</label>
        <select 
          name="categoryId" 
          defaultValue={initialData?.categoryId || ""}
          required
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          {!initialData && <option value="" disabled>Select category</option>}
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
          {categories.length === 0 && <option value="" disabled>No categories available</option>}
        </select>
      </div>
      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2">Price (Rp)</label>
        <input 
          type="number" 
          name="price"
          defaultValue={initialData?.price} 
          required
          min="0"
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="e.g. 50000"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2">Image URL</label>
        <input 
          type="url" 
          name="imageUrl"
          defaultValue={initialData?.imageUrl || ""}
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="https://example.com/image.png"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2">Description</label>
        <textarea 
          name="description" 
          defaultValue={initialData?.description}
          required
          rows={3}
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Enter product description..."
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
      >
        {loading ? (initialData ? 'Updating...' : 'Adding...') : (initialData ? 'Update Product' : 'Add Product')}
      </button>
    </form>
  );
}
