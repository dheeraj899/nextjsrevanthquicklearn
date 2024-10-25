// File: /path/to/your/project/lib/db.js

import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
export const db = new PrismaClient({
  // Uncomment below to log queries for debugging
  // log: [{ emit: 'stdout', level: 'query' }],
});