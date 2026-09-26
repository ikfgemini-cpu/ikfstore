import Link from 'next/link';
import { LayoutDashboard, ShoppingCart, Settings, Package, LogOut } from 'lucide-react';
import { logoutAction } from '@/app/actions/authActions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col space-y-4">
        <Link href="/admin" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-xl transition">
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link href="/admin/orders" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-xl transition">
          <ShoppingCart size={20} />
          <span className="font-medium">Orders</span>
        </Link>
        <Link href="/admin/products" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-xl transition">
          <Package size={20} />
          <span className="font-medium">Products</span>
        </Link>
        <Link href="/admin/settings" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-xl transition mt-auto">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
        <form action={logoutAction} className="w-full">
          <button type="submit" className="w-full flex items-center space-x-3 text-red-400 hover:text-red-300 hover:bg-red-950/30 px-4 py-3 rounded-xl transition">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gray-950 text-gray-100">
        {children}
      </main>
    </div>
  );
}
