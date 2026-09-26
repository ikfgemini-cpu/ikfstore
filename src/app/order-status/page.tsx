import prisma from '@/lib/prisma';
import OrderStatusClient from './OrderStatusClient';

export default async function OrderStatusPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  let orderData = null;
  let settingsData = null;

  if (id) {
    orderData = await prisma.order.findUnique({
      where: { id },
      include: { product: true }
    });
    
    if (orderData && orderData.status === 'APPROVED') {
       const settings = await prisma.settings.findFirst();
       if (settings) {
         settingsData = {
           qrisImageUrl: settings.qrisImageUrl,
           whatsappNumber: settings.whatsappNumber
         }
       }
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl min-h-[70vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-white mb-8">Check Order Status</h1>
      
      <OrderStatusClient initialOrderId={id} initialOrder={orderData} settings={settingsData} />
      
    </div>
  );
}
