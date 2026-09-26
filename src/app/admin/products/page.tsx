import prisma from '@/lib/prisma';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

export const revalidate = 0;

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });
  
  const categories = await prisma.category.findMany();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Products</h1>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
         <div className="md:col-span-1">
           <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 shadow-xl sticky top-8">
             <h2 className="text-xl font-bold text-white mb-6">Add New Product</h2>
             <ProductForm categories={categories} />
           </div>
         </div>
         <div className="md:col-span-2">
           <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6">Product Catalog</h2>
              <ProductList products={products} />
           </div>
         </div>
      </div>
    </div>
  );
}
