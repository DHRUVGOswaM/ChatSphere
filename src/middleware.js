import { clerkMiddleware } from '@clerk/nextjs/server'

// Use clerkMiddleware for the correct export name.
export default clerkMiddleware({
//       beforeAuth: (req) => {
//     console.log('Middleware running on:', req.nextUrl.pathname);
//   },
    // Public routes are the only paths accessible without authentication.
    publicRoutes: [
        '/',
        '/forums',               // Keep the main forum index page public
        '/sign-in',
        '/sign-up',
        '/api/stream/token',    // Allow unauthenticated access for token exchange logic
        '/api/webhook',
    ],
    // IMPORTANT: Ignore the webhook route entirely so Clerk doesn't check for auth
    ignoredRoutes: ['/api/webhook'],
    
    // Explicitly set the sign-in URL to force redirection 
    signInUrl: '/sign-in', 
});

// We must EXPORT the config object separately when using the modern clerkMiddleware.
export const config = {
    // This matcher defines ALL routes where the middleware should run.
    matcher: [
        // 1. Match everything except internal Next.js paths and static assets
        '/((?!_next|.*\\..*).*)', 
        // 2. Always match API routes
        '/api/(.*)', 
    ],
};
