'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateOrderStatus } from '@/app/actions/adminActions';

export default function OrderStatusSelect({ orderId, initialStatus }: { orderId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);
    
    try {
      await updateOrderStatus(orderId, newStatus);
      router.refresh();
    } catch (err) {
      console.error(err);
      setStatus(initialStatus); // Revert on failure
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (s: string) => {
    switch(s) {
      case 'PENDING': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'APPROVED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'COMPLETED': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'REJECTED': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-800 text-gray-300';
    }
  };

  return (
    <div className="relative">
      <select 
        value={status}
        onChange={handleChange}
        disabled={loading}
        className={`appearance-none font-bold text-xs tracking-wide uppercase px-3 py-1.5 pr-8 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors ${getStatusColor(status)}`}
      >
        <option value="PENDING">PENDING</option>
        <option value="APPROVED">APPROVE</option>
        <option value="COMPLETED">COMPLETE</option>
        <option value="REJECTED">REJECT</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-70">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  );
}
