// GET /api/jobs — public endpoint, returns all current job postings.
export async function onRequestGet(context) {
  const { env } = context;

  if (!env.JOBS_KV) {
    return new Response(JSON.stringify({ error: 'JOBS_KV binding is not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const raw = await env.JOBS_KV.get('jobs');
  const jobs = raw ? JSON.parse(raw) : [];
  jobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

  return new Response(JSON.stringify(jobs), {
    headers: { 'Content-Type': 'application/json' }
  });
}
