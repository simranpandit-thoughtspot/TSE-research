export const config = {
  matcher: ['/((?!landing\\.html|_next/|favicon|.*\\.ico|.*\\.png|.*\\.svg|.*\\.woff2|.*\\.css|.*\\.js).*)'],
};

export default function middleware(request: Request) {
  if (process.env.PUBLIC_MODE !== 'true') {
    return;
  }

  const url = new URL(request.url);
  url.pathname = '/landing.html';
  return Response.redirect(url.toString(), 302);
}
