'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please provide both email and password.' };
  }

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return { error: 'Invalid email or password.' };
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  
  if (!isPasswordValid) {
    return { error: 'Invalid email or password.' };
  }

  await createSession(admin.id);
  
  redirect('/admin');
}

export async function logoutAction() {
  await deleteSession();
  redirect('/login');
}
