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

async function isAuthed(request, env) {
  const token = getCookie(request, 'admin_session');
  if (!token || !env.ADMIN_PASSWORD) return false;
  const expected = await sha256(env.ADMIN_PASSWORD + '::maapaas-admin-session');
  return token === expected;
}

function unauthorized() {
  return new Response(JSON.stringify({ ok: false, error: 'Not authorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' }
  });
}

// POST /api/admin/jobs — add a new posting (admin only).
export async function onRequestPost(context) {
  const { request, env } = context;
  if (!(await isAuthed(request, env))) return unauthorized();

  if (!env.JOBS_KV) {
    return new Response(JSON.stringify({ ok: false, error: 'JOBS_KV binding is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json().catch(() => ({}));
  const title = (body.title || '').trim();
  const location = (body.location || '').trim();
  const type = (body.type || 'Full-time').trim();
  const description = (body.description || '').trim();

  if (!title || !description) {
    return new Response(JSON.stringify({ ok: false, error: 'Title and description are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const raw = await env.JOBS_KV.get('jobs');
  const jobs = raw ? JSON.parse(raw) : [];

  const job = {
    id: crypto.randomUUID(),
    title,
    location,
    type,
    description,
    postedAt: new Date().toISOString()
  };
  jobs.push(job);
  await env.JOBS_KV.put('jobs', JSON.stringify(jobs));

  return new Response(JSON.stringify({ ok: true, job }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// DELETE /api/admin/jobs?id=... — remove a posting (admin only).
export async function onRequestDelete(context) {
  const { request, env } = context;
  if (!(await isAuthed(request, env))) return unauthorized();

  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const raw = await env.JOBS_KV.get('jobs');
  const jobs = raw ? JSON.parse(raw) : [];
  const next = jobs.filter((j) => j.id !== id);
  await env.JOBS_KV.put('jobs', JSON.stringify(next));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
