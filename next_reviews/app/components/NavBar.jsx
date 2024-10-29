// File path: components/NavBar.jsx

import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import NavLink from './NavLink';

const JWT_SECRET = new TextEncoder().encode('some-random-string');

async function getUserFromSession() {
  const sessionTokenCookie = cookies().get('sessionToken');
  if (sessionTokenCookie) {
    try {
      const { payload } = await jwtVerify(sessionTokenCookie.value, JWT_SECRET);
      return payload;
    } catch (error) {
      console.warn('Invalid JWT', error);
    }
  }
}


// File path: components/NavBar.jsx

export default async function NavBar() {
  const user = await getUserFromSession();
  return (
    <nav>
      <ul className="flex gap-2">
        <li className="font-bold font-orbitron">
          <NavLink href="/">
            Indie Gamer
          </NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href="/reviews">
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink href="/about" prefetch={false}>
            About
          </NavLink>
        </li>
        {user ? (
          <li>
            {user.email}
          </li>
        ) : (
        <li>
          <NavLink href="/sign-in">
            Sign in
          </NavLink>
        </li>
        )}
      </ul>
    </nav>
  );
}
