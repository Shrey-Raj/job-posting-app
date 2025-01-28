import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib";

export async function middleware(request: NextRequest) {
  try {
    // const res = await updateSession(request);

    const session = await getSession();

    const isLoginPage = request.nextUrl.pathname === "/login";
    const isSignupPage = request.nextUrl.pathname === "/signup"; 
    const isHomePage = request.nextUrl.pathname === "/"; 

    if (!session && !isLoginPage && !isSignupPage && !isHomePage) {
      // If no session and not on the login page,signup page or home page then redirect to home
      return NextResponse.redirect(new URL("/", request.url));
    } 
    else if (session && (isLoginPage || isSignupPage || isHomePage)) {
      // If there is a session and trying to access the login page , signupPage or home page , redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard/", request.url));
    }

    // If the session is valid or user is on the login page, continue with the request
    return NextResponse.next();
  } catch (error) {
    console.error("Session check error:", error);
    // If the session is invalid or expired, redirect to the home page
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login" , "/signup" , "/"],
};
