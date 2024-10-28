// File path: app/sign-in/actions.js

'use server';

import { redirect } from 'next/navigation';

export async function signInAction(formData) {
  console.log('[signInAction]', formData);
  const email = formData.get('email');
  const password = formData.get('password');
  const user = authenticate(email, password);
  if (!user) {
    return { isError: true, message: 'Invalid credentials' };
  }
  redirect('/');
}

function authenticate(email, password) {
  if (email.endsWith('@example.com') && password === 'test') {
    return { email };
  }
}