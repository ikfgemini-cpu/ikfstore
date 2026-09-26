'use server';

import { cookies } from 'next/headers';

export async function acceptCookies() {
  const cookieStore = await cookies();
  cookieStore.set('cookies_accepted', 'yes', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    sameSite: 'lax'
  });
}
