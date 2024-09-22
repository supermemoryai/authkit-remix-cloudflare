import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { ArgsWithContext, cookieName } from "./type";

export function getCookieFunctions(context : ArgsWithContext['context']) {

    const redirectUrl = new URL(context.env.WORKOS_REDIRECT_URI);
    const isSecureProtocol = redirectUrl.protocol === 'https:';
    const cookieOptions = {
        path: '/',
        httpOnly: true,
        secure: isSecureProtocol,
        sameSite: 'lax' as const,
        // Defaults to 400 days, the maximum allowed by Chrome
        // It's fine to have a long cookie expiry date as the access/refresh tokens
        // act as the actual time-limited aspects of the session.
        maxAge: context.env.WORKOS_COOKIE_MAX_AGE ? parseInt(context.env.WORKOS_COOKIE_MAX_AGE, 10) : 60 * 60 * 24 * 400,
        secrets: [context.env.WORKOS_COOKIE_PASSWORD],
    };
    const { getSession, commitSession, destroySession } = createCookieSessionStorage({
        cookie: {
            name: cookieName,
            ...cookieOptions,
        },
    });

    return { getSession, commitSession, destroySession };
}