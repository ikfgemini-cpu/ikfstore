import prisma from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0; // Disable caching for now to always show latest

export default async function Home() {
  const products = await prisma.product.findMany({
    include: { category: true }
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-10 text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Beli Akun Digital Premium</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Cepat, aman, dan bergaransi penuh.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="aspect-square bg-gray-800 flex justify-center items-center overflow-hidden">
                {product.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-500 font-bold text-2xl">{product.name.charAt(0)}</div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-1">{product.name}</h2>
                <p className="text-sm text-gray-400 mt-1">{product.category.name}</p>
              </div>
            </div>
          </Link>
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center py-20 text-gray-500">
            No products available yet.
          </div>
        )}
      </div>
    </div>
  );
}
