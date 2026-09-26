'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(orderId: string, status: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
  
  revalidatePath('/admin/orders');
  revalidatePath('/admin');
  revalidatePath('/order-status');
}

export async function updateSettings(formData: FormData) {
  const whatsappNumber = formData.get('whatsappNumber') as string;
  const qrisImageUrl = formData.get('qrisImageUrl') as string;

  const existingSettings = await prisma.settings.findFirst();
  
  if (existingSettings) {
    await prisma.settings.update({
      where: { id: existingSettings.id },
      data: {
        whatsappNumber,
        qrisImageUrl
      }
    });
  } else {
    await prisma.settings.create({
      data: {
        whatsappNumber,
        qrisImageUrl
      }
    });
  }

  revalidatePath('/admin/settings');
  revalidatePath('/order-status');
}

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const imageUrl = formData.get('imageUrl') as string;
  const categoryId = formData.get('categoryId') as string;

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      imageUrl: imageUrl || null,
      categoryId
    }
  });

  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id }
  });

  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const imageUrl = formData.get('imageUrl') as string;
  const categoryId = formData.get('categoryId') as string;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price,
      imageUrl: imageUrl || null,
      categoryId
    }
  });

  revalidatePath('/admin/products');
  revalidatePath('/');
}
