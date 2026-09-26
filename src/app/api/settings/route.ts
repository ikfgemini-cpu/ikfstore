import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst();
    if (settings) {
      return NextResponse.json({ whatsappNumber: settings.whatsappNumber });
    }
    return NextResponse.json({ whatsappNumber: '6281234567890' });
  } catch (error) {
    return NextResponse.json({ whatsappNumber: '6281234567890' });
  }
}
