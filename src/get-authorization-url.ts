import { getWorkos } from './workos.js';
import { GetAuthURLOptions } from './interfaces.js';
import { AppLoadContext } from '@remix-run/cloudflare';

async function getAuthorizationUrl(options: GetAuthURLOptions = {}, context: AppLoadContext) {
  const { returnPathname, screenHint } = options;

  const workos = getWorkos(context);

  if (!context.cloudflare.env) {
    throw new Error('WORKOS_API_KEY, WORKOS_CLIENT_ID, WORKOS_COOKIE_MAX_AGE, WORKOS_COOKIE_PASSWORD, and WORKOS_REDIRECT_URI must be set in the environment variables');
  }

  return workos.userManagement.getAuthorizationUrl({
    provider: 'authkit',
    clientId: (context.cloudflare.env as Record<string, string>).WORKOS_CLIENT_ID,
    redirectUri: (context.cloudflare.env as Record<string, string>).WORKOS_REDIRECT_URI,
    state: returnPathname ? btoa(JSON.stringify({ returnPathname })) : undefined,
    screenHint,
  });
}

export { getAuthorizationUrl };
