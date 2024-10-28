// File path: app/sign-in/actions.js

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signInAction(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const user = authenticate(email, password);
  
  if (!user) {
    return { isError: true, message: 'Invalid credentials' };
  }

  cookies().set('user', JSON.stringify(user)); // Set the user cookie
  redirect('/');
}

function authenticate(email, password) {
  if (email.endsWith('@example.com') && password === 'test') {
    return { email };
  }
}