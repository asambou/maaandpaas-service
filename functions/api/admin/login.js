async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// POST /api/admin/login — { password } -> sets admin_session cookie on success.
export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ ok: false, error: 'ADMIN_PASSWORD is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json().catch(() => ({}));
  const password = body.password || '';

  if (password !== env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ ok: false, error: 'Incorrect password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = await sha256(env.ADMIN_PASSWORD + '::maapaas-admin-session');
  const headers = new Headers({ 'Content-Type': 'application/json' });
  headers.append(
    'Set-Cookie',
    `admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200`
  );

  return new Response(JSON.stringify({ ok: true }), { headers });
}
