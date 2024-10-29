// File path: lib/auth.js

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_COOKIE = 'sessionToken';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const JWT_DURATION = 14 * 24 * 60 * 60 * 1000; // 2 weeks

export async function getUserFromSession() {
  const sessionTokenCookie = cookies().get(JWT_COOKIE);
  if (sessionTokenCookie) {
    try {
      const { payload } = await jwtVerify(sessionTokenCookie.value, JWT_SECRET);
      return payload;
    } catch (error) {
      console.warn('Invalid JWT', error);
    }
  }
}
export async function setSessionCookie(user) {
  const expirationTime = new Date(Date.now() + JWT_DURATION);
  const sessionToken = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expirationTime)
    .sign(JWT_SECRET);
    cookies().set(JWT_COOKIE, sessionToken, {
      expires: expirationTime,
      httpOnly: true,
      sameSite: 'lax',
});
}