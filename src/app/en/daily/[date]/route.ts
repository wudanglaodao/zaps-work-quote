const legacyDailyPath = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(_request: Request, context: { params: Promise<{ date: string }> }) {
  const { date } = await context.params;

  if (!legacyDailyPath.test(date)) {
    return new Response("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }

  return new Response("This legacy daily page has been permanently removed.", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
