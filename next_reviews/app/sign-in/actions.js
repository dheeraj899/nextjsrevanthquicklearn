// File path: app/sign-in/actions.js

'use server';

import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const JWT_SECRET = new TextEncoder().encode('some-random-string');

export async function signInAction(formData) {
  console.log('[signInAction]', formData);
  const email = formData.get('email');
  const password = formData.get('password');
  const user = authenticate(email, password);
  if (!user) {
    return { isError: true, message: 'Invalid credentials' };
  }
  const sessionToken = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(JWT_SECRET);
  cookies().set('sessionToken', sessionToken);
  redirect('/');
}

function authenticate(email, password) {
  if (email.endsWith('@example.com') && password === 'test') {
    return { email };
  }
}