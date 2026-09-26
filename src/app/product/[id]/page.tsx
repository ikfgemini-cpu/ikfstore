import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import OrderForm from './OrderForm';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 p-6 flex flex-col items-center">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.imageUrl} alt={product.name} className="w-48 h-48 object-cover rounded-xl shadow-lg" />
            ) : (
              <div className="w-48 h-48 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 font-bold text-4xl">
                {product.name.charAt(0)}
              </div>
            )}
            <h1 className="text-3xl font-bold text-white mt-6">{product.name}</h1>
            <p className="text-gray-400 mt-2">{product.category.name}</p>
            <div className="mt-4 text-2xl font-bold text-blue-500">
              Rp {product.price.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
             <h2 className="text-xl font-semibold mb-4 text-white">Description</h2>
             <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{product.description}</p>
          </div>
        </div>
        
        <div>
          <OrderForm productId={product.id} price={product.price} />
        </div>
      </div>
    </div>
  );
}
