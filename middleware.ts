import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./hooks/useAuth";

const protectedRoutes = ["/protected"];


export default async function middleware(request: NextRequest) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.includes(pathname);

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/authentication", request.url))
  }

  return NextResponse.next()
}




