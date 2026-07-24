async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

// GET /api/admin/check — tells the admin page whether the current visitor is logged in.
export async function onRequestGet(context) {
  const { request, env } = context;
  const token = getCookie(request, 'admin_session');
  let authed = false;

  if (token && env.ADMIN_PASSWORD) {
    const expected = await sha256(env.ADMIN_PASSWORD + '::maapaas-admin-session');
    authed = token === expected;
  }

  return new Response(JSON.stringify({ authed }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
