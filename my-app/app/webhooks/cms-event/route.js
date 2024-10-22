// app/webhooks/cms-event/route.js
import { revalidateTag } from 'next/cache';
import { CACHE_TAG_REVIEWS } from '@/lib/reviews';

export async function POST(request) {
  const payload = await request.json();
  console.log('payload:', payload);
  if (payload.model === 'review') {
    revalidateTag(CACHE_TAG_REVIEWS);
    console.log('revalidated:', CACHE_TAG_REVIEWS);
  }
  return new Response(null, { status: 204 });
}