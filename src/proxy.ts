import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function proxy(request: NextRequest) {
 const { supabaseResponse, user } = await updateSession(request)
  const pathname = request.nextUrl.pathname

  const redirectWithCookies = (destination: string) => {
    const url = request.nextUrl.clone()
    url.pathname = destination
    const redirectResponse = NextResponse.redirect(url)

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })

    return redirectResponse
  }

   const protectedRoutes = ["/", '/profile']
  const authRoutes = ['/signin', '/signup']

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
  if (!user && isProtectedRoute) {
    return redirectWithCookies('/signin')
  }

  if (user && isAuthRoute) {
    return redirectWithCookies('/')
  }

  return supabaseResponse
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}