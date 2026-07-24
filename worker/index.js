// Single Worker entry point for maaandpaas-service.
// Handles /api/* routes; everything else is served from static assets (env.ASSETS).

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

function sessionToken(env) {
  return sha256(env.ADMIN_PASSWORD + '::maapaas-admin-session');
}

async function isAuthed(request, env) {
  const token = getCookie(request, 'admin_session');
  if (!token || !env.ADMIN_PASSWORD) return false;
  return token === (await sessionToken(env));
}

function json(body, init) {
  init = init || {};
  const headers = new Headers(init.headers || {});
  headers.set('Content-Type', 'application/json');
  return new Response(JSON.stringify(body), { status: init.status || 200, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // ---- Public: list all jobs ----
    if (path === '/api/jobs' && method === 'GET') {
      if (!env.JOBS_KV) return json({ error: 'JOBS_KV binding is not configured' }, { status: 500 });
      const raw = await env.JOBS_KV.get('jobs');
      const jobs = raw ? JSON.parse(raw) : [];
      jobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
      return json(jobs);
    }

    // ---- Admin: login ----
    if (path === '/api/admin/login' && method === 'POST') {
      if (!env.ADMIN_PASSWORD) return json({ ok: false, error: 'ADMIN_PASSWORD is not configured' }, { status: 500 });
      const body = await request.json().catch(() => ({}));
      if ((body.password || '') !== env.ADMIN_PASSWORD) {
        return json({ ok: false, error: 'Incorrect password' }, { status: 401 });
      }
      const token = await sessionToken(env);
      return json({ ok: true }, {
        headers: { 'Set-Cookie': `admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200` }
      });
    }

    // ---- Admin: logout ----
    if (path === '/api/admin/logout' && method === 'POST') {
      return json({ ok: true }, {
        headers: { 'Set-Cookie': 'admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0' }
      });
    }

    // ---- Admin: check session ----
    if (path === '/api/admin/check' && method === 'GET') {
      return json({ authed: await isAuthed(request, env) });
    }

    // ---- Admin: add a job ----
    if (path === '/api/admin/jobs' && method === 'POST') {
      if (!(await isAuthed(request, env))) return json({ ok: false, error: 'Not authorized' }, { status: 401 });
      if (!env.JOBS_KV) return json({ ok: false, error: 'JOBS_KV binding is not configured' }, { status: 500 });
      const body = await request.json().catch(() => ({}));
      const title = (body.title || '').trim();
      const location = (body.location || '').trim();
      const type = (body.type || 'Full-time').trim();
      const description = (body.description || '').trim();
      if (!title || !description) {
        return json({ ok: false, error: 'Title and description are required' }, { status: 400 });
      }
      const raw = await env.JOBS_KV.get('jobs');
      const jobs = raw ? JSON.parse(raw) : [];
      const job = {
        id: crypto.randomUUID(),
        title, location, type, description,
        postedAt: new Date().toISOString()
      };
      jobs.push(job);
      await env.JOBS_KV.put('jobs', JSON.stringify(jobs));
      return json({ ok: true, job });
    }

    // ---- Admin: delete a job ----
    if (path === '/api/admin/jobs' && method === 'DELETE') {
      if (!(await isAuthed(request, env))) return json({ ok: false, error: 'Not authorized' }, { status: 401 });
      const id = url.searchParams.get('id');
      if (!id) return json({ ok: false, error: 'Missing id' }, { status: 400 });
      const raw = await env.JOBS_KV.get('jobs');
      const jobs = raw ? JSON.parse(raw) : [];
      await env.JOBS_KV.put('jobs', JSON.stringify(jobs.filter((j) => j.id !== id)));
      return json({ ok: true });
    }

    // ---- Everything else: serve static files ----
    return env.ASSETS.fetch(request);
  }
};
