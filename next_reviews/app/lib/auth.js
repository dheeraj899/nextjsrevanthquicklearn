// File path: lib/auth.js

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_COOKIE = 'sessionToken';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
// File path: lib/auth.js

const JWT_DURATION = 14 * 24 * 60 * 60 * 1000; // 2 weeks


// File path: lib/auth.js

export async function getUserFromSession() {
    const sessionToken = cookies().get(JWT_COOKIE)?.value;
    if (sessionToken) {
      try {
        const { payload } = await jwtVerify(sessionToken, JWT_SECRET);
        return payload;
      } catch (error) {
        console.warn('Invalid JWT', error);
      }
    }
}
// File path: lib/auth.js

export async function setSessionCookie({ id, email, name }) {
    const expirationTime = new Date(Date.now() + JWT_DURATION);
    const sessionToken = await new SignJWT({ id, email, name })
    //const expirationTime = new Date(Date.now() + JWT_DURATION);
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expirationTime)
    .sign(JWT_SECRET);
    cookies().set(JWT_COOKIE, sessionToken, {
        expires: expirationTime,
        httpOnly: true,
        sameSite: 'lax',
      });
    
  }
  // File path: lib/auth.js

export function deleteSessionCookie() {
    cookies().delete(JWT_COOKIE);
  }