// File path: app/sign-up/actions.js

'use server';

import { redirect } from 'next/navigation';
import { setSessionCookie } from '@/lib/auth';
import { createUser } from '@/lib/users';

export async function signUpAction(formData) {
  const data = {
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
  };
  // TODO validate data / handle duplicate email
  try {
    const user = await createUser(data);
    console.log('[signUpAction] user:', user);
    await setSessionCookie(user);
    redirect('/');
  } catch (error) {
    if (error.code === 'P2002') { // Prisma unique constraint error
      return { isError: true, message: 'Email already exists' };
    }
    throw error;
  }
}