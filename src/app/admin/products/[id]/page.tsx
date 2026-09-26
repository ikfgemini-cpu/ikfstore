import prisma from '@/lib/prisma';
import ProductForm from '../ProductForm';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 0;

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  const categories = await prisma.category.findMany();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin/products" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">&larr; Back to Products</Link>
          <h1 className="text-3xl font-bold text-white">Edit Product</h1>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 shadow-xl max-w-xl">
        <ProductForm categories={categories} initialData={product} />
      </div>
    </div>
  );
}
