import { AppLoadContext, createCookieSessionStorage } from "@remix-run/cloudflare";
import {cookieName } from "./type.js";

export function getCookieFunctions(context : AppLoadContext) {

    if (!context.cloudflare.env) {
      throw new Error('WORKOS_API_KEY, WORKOS_CLIENT_ID, WORKOS_COOKIE_MAX_AGE, WORKOS_COOKIE_PASSWORD, and WORKOS_REDIRECT_URI must be set in the environment variables');
    }

    const redirectUrl = new URL((context.cloudflare.env as Record<string, string>).WORKOS_REDIRECT_URI);
    const isSecureProtocol = redirectUrl.protocol === 'https:';
    const cookieOptions = {
        path: '/',
        httpOnly: true,
        secure: isSecureProtocol,
        sameSite: 'lax' as const,
        // Defaults to 400 days, the maximum allowed by Chrome
        // It's fine to have a long cookie expiry date as the access/refresh tokens
        // act as the actual time-limited aspects of the session.
        maxAge: (context.cloudflare.env as Record<string, string>).WORKOS_COOKIE_MAX_AGE ? parseInt((context.cloudflare.env as Record<string, string>).WORKOS_COOKIE_MAX_AGE, 10) : 60 * 60 * 24 * 400,
        secrets: [(context.cloudflare.env as Record<string, string>).WORKOS_COOKIE_PASSWORD],
    };
    const { getSession, commitSession, destroySession } = createCookieSessionStorage({
        cookie: {
            name: cookieName,
            ...cookieOptions,
        },
    });

    return { getSession, commitSession, destroySession };
}