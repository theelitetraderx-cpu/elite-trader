import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient as createSupabaseClient } from './utils/supabase/middleware';

// Basic in-memory rate limiting map.
const rateLimitMap = new Map();

export async function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || '';

  // 1. Basic Bot User-Agent Blocking
  const blockedBots = ['python-requests', 'curl', 'wget', 'postman', 'scripter', 'bot', 'spider', 'crawl'];
  if (blockedBots.some(bot => userAgent.toLowerCase().includes(bot))) {
    return new NextResponse(JSON.stringify({ error: 'Access Denied: Automated bots are not allowed.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 2. Sensitive Route Rate Limiting
  const isSensitiveRoute = 
    request.nextUrl.pathname.startsWith('/login') || 
    request.nextUrl.pathname.startsWith('/register') || 
    request.nextUrl.pathname.startsWith('/api/chat');

  if (isSensitiveRoute && request.method === 'POST') {
    const limit = 5;
    const windowMs = 60 * 1000;
    
    const maxEntries = rateLimitMap.get(ip) || { count: 0, startTime: Date.now() };
    
    if (Date.now() - maxEntries.startTime > windowMs) {
      maxEntries.count = 1;
      maxEntries.startTime = Date.now();
    } else {
      maxEntries.count += 1;
    }

    rateLimitMap.set(ip, maxEntries);

    if (maxEntries.count > limit) {
      return new NextResponse(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: {
          'Retry-After': '60',
          'Content-Type': 'application/json'
        }
      });
    }
  }

  // 3. Supabase SSR Session refresh
  // We MUST await this to ensure the auth token is refreshed and cookies are set.
  const { supabase, response } = await createSupabaseClient(request);

  // 4. Secure Route Protection
  const isProtectedPath = 
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/portal') ||
    request.nextUrl.pathname.startsWith('/admin');

  if (isProtectedPath) {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (!user || error) {
      // Missing or invalid session, redirect to login
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ]
};
