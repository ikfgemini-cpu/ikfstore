'use server';

import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createOrder(formData: FormData) {
  const productId = formData.get('productId') as string;
  const userId = formData.get('userId') as string;
  const email = formData.get('email') as string;
  const quantity = parseInt(formData.get('quantity') as string, 10);
  const price = parseFloat(formData.get('price') as string);

  if (!productId || !userId || !email || !quantity || !price) {
    throw new Error('Missing fields');
  }

  const order = await prisma.order.create({
    data: {
      productId,
      userId,
      email,
      quantity,
      totalPrice: quantity * price,
      status: 'PENDING',
    }
  });

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const consent = cookieStore.get('cookies_accepted')?.value;
  
  if (consent === 'yes') {
    const historyCookie = cookieStore.get('order_history')?.value;
    let history: string[] = [];
    if (historyCookie) {
      try {
        history = JSON.parse(historyCookie);
      } catch (e) {}
    }
    history.push(order.id);
    
    // Keep only last 10 orders to avoid cookie size limits
    if (history.length > 10) history = history.slice(history.length - 10);
    
    cookieStore.set('order_history', JSON.stringify(history), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: 'lax'
    });
  }

  redirect(`/order-status?id=${order.id}`);
}
