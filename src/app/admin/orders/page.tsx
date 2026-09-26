import prisma from '@/lib/prisma';
import OrderStatusSelect from './OrderStatusSelect';

export const revalidate = 0;

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: true }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">Manage Orders</h1>
      
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800/50 text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Nomor WA</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-800/20">
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">{order.id}</td>
                  <td className="px-6 py-4 text-gray-200">{order.userId}</td>
                  <td className="px-6 py-4">
                    <div className="text-gray-200">{order.product.name}</div>
                    <div className="text-xs text-gray-500">Qty: {order.quantity}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-blue-400">Rp {order.totalPrice.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">
                     <OrderStatusSelect orderId={order.id} initialStatus={order.status} />
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-lg">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
