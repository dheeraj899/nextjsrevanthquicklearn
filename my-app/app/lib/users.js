// File path: lib/users.js

import { hash } from 'bcrypt';
import { compare } from 'bcrypt';
import { db } from './db';

export async function createUser({ email, name, password }) {
  const passwordHash = await hash(password, 10); // 10 rounds for salt generation
  return await db.user.create({
    data: { email, name, passwordHash }, // Only include email, name, and passwordHash
  });
}

export async function authenticateUser(email, password) {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (user && await compare(password, user.passwordHash)) {
    return user;
  }
}
