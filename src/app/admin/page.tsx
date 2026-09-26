import prisma from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminDashboard() {
  const totalOrders = await prisma.order.count();
  const pendingOrders = await prisma.order.count({ where: { status: 'PENDING' } });
  const approvedOrders = await prisma.order.count({ where: { status: 'APPROVED' } });
  
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { product: true }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-sm">
          <p className="text-gray-400 font-medium mb-1">Total Orders</p>
          <p className="text-4xl font-bold text-white">{totalOrders}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-sm">
          <p className="text-gray-400 font-medium mb-1">Pending Approvals</p>
          <p className="text-4xl font-bold text-yellow-500">{pendingOrders}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-sm">
          <p className="text-gray-400 font-medium mb-1">Approved Orders</p>
          <p className="text-4xl font-bold text-blue-500">{approvedOrders}</p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Recent Orders</h2>
          <Link href="/admin/orders" className="text-blue-500 hover:text-blue-400 text-sm font-medium">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800/50 text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-800/20">
                  <td className="px-6 py-4 font-mono text-sm text-gray-300">{order.id}</td>
                  <td className="px-6 py-4 text-gray-300">{order.product.name}</td>
                  <td className="px-6 py-4 text-gray-300">Rp {order.totalPrice.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase
                      ${order.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                      ${order.status === 'APPROVED' ? 'bg-blue-500/10 text-blue-500' : ''}
                      ${order.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : ''}
                      ${order.status === 'REJECTED' ? 'bg-red-500/10 text-red-500' : ''}
                    `}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
