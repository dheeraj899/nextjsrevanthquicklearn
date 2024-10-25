// File: /path/to/your/project/scripts/test-db.mjs

import { PrismaClient } from '@prisma/client';

// Initialize the Prisma Client
const db = new PrismaClient({
  log: [{ emit: 'stdout', level: 'query' }],
});

// Example: Creating a new comment
const comment = await db.comment.create({
  data: {
    slug: 'fall-guys',
    user: 'Alice',
    message: 'This is a test comment.',
  },
});
console.log('created:', comment);

// Querying the database: Find all comments with a specific slug
const comments = await db.comment.findMany({
  where: { slug: 'fall-guys' },
});
console.log('comments:', comments);