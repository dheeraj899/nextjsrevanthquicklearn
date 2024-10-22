// app/webhooks/cms-event/route.js
export async function POST(request) {
    const payload = await request.json();
    console.log('payload:', payload);
    return new Response(null, { status: 204 });
  }