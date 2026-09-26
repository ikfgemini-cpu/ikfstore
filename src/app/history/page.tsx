import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const revalidate = 0;

export default async function HistoryPage() {
  const cookieStore = await cookies();
  const historyCookie = cookieStore.get('order_history')?.value;
  let orderIds: string[] = [];
  
  if (historyCookie) {
    try {
      orderIds = JSON.parse(historyCookie);
    } catch (e) {}
  }

  // Fetch orders
  const orders = await prisma.order.findMany({
    where: {
      id: {
        in: orderIds
      }
    },
    include: {
      product: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl min-h-[70vh]">
      <h1 className="text-3xl font-bold text-white mb-8">Riwayat Pembelian</h1>
      
      {orders.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
          <p className="text-gray-400 mb-4">Belum ada riwayat pesanan yang tersimpan di perangkat ini.</p>
          <Link href="/" className="text-blue-500 hover:text-blue-400 font-medium">Mulai Belanja</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <Link href={`/order-status?id=${order.id}`} key={order.id} className="block">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition-colors shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-bold text-white text-lg">{order.product.name}</h3>
                  <p className="text-sm text-gray-400 font-mono mt-1">ID: {order.id}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleString('id-ID')}</p>
                </div>
                <div className="flex flex-col md:items-end w-full md:w-auto">
                  <div className="flex justify-between md:justify-end w-full items-center md:space-x-4">
                    <span className="font-bold text-blue-400 text-lg">Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ml-4
                        ${order.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                        ${order.status === 'APPROVED' ? 'bg-blue-500/10 text-blue-500' : ''}
                        ${order.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : ''}
                        ${order.status === 'REJECTED' ? 'bg-red-500/10 text-red-500' : ''}
                      `}>
                        {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
