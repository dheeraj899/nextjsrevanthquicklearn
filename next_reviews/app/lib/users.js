// File path: lib/users.js

// File path: lib/users.js

import { db } from './db';

export async function authenticateUser(email, password) {
  return await db.user.findUnique({
    where: { email, password },
  });
}

export async function createUser({ email, name, password }) {
  return await db.user.create({
    data: { email, name, password },
  });
}