// File: /path/to/your/project/lib/db.js

import { PrismaClient } from '@prisma/client';

export const db = createPrismaClient();

/** @returns {PrismaClient} */
function createPrismaClient() {
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient({
      // Uncomment below to log queries for debugging
      // log: [{ emit: 'stdout', level: 'query' }],
    });
  }
  return globalThis.prismaClient;
}