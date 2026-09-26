'use client';

import { updateSettings } from '@/app/actions/adminActions';
import { useState } from 'react';

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [qrisUrl, setQrisUrl] = useState(initialData?.qrisImageUrl || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    
    try {
      const formData = new FormData(e.currentTarget);
      await updateSettings(formData);
      setSuccessMessage('Settings updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2">WhatsApp Number (incl. country code)</label>
        <input 
          type="text" 
          name="whatsappNumber" 
          defaultValue={initialData?.whatsappNumber}
          required
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="e.g. 6281234567890"
        />
        <p className="text-xs text-gray-500 mt-2">This number will be used for customer support and payment confirmation.</p>
      </div>
      
      <div className="pt-4 border-t border-gray-800">
        <label className="block text-gray-400 text-sm font-medium mb-2">QRIS Image URL</label>
        <input 
          type="url" 
          name="qrisImageUrl" 
          value={qrisUrl}
          onChange={(e) => setQrisUrl(e.target.value)}
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="https://example.com/my-qris-barcode.png"
        />
        <p className="text-xs text-gray-500 mt-2">Enter the direct URL to your QRIS barcode image. It will be shown to customers when an order is Approved.</p>
        
        {qrisUrl && (
           <div className="mt-4 p-4 bg-gray-950 rounded-xl inline-block border border-gray-800">
             <p className="text-xs text-gray-400 mb-2">Preview:</p>
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={qrisUrl} alt="QRIS Preview" className="w-32 h-32 object-contain bg-white p-1 rounded" onError={(e) => (e.currentTarget.style.display = 'none')} />
           </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
        {successMessage && <span className="text-green-500 font-medium">{successMessage}</span>}
      </div>
    </form>
  );
}
