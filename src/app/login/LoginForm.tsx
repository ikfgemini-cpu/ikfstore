'use client';

import { loginAction } from '@/app/actions/authActions';
import { useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    try {
      const res = await loginAction(formData);
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      // If it redirects, it might throw NEXT_REDIRECT, which is normal
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm text-center">
          {error}
        </div>
      )}
      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2">Email Address</label>
        <input 
          type="email" 
          name="email" 
          required
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2">Password</label>
        <input 
          type="password" 
          name="password" 
          required
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="••••••••"
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors mt-6 disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Login'}
      </button>
    </form>
  );
}
