import { AppLoadContext } from '@remix-run/cloudflare';
import { getAuthorizationUrl } from './get-authorization-url.js';
import { terminateSession } from './session.js';

async function getSignInUrl(context: AppLoadContext) {
  return getAuthorizationUrl({ screenHint: 'sign-in' }, context);
}

async function getSignUpUrl(context: AppLoadContext) {
  return getAuthorizationUrl({ screenHint: 'sign-up' }, context);
}

async function signOut(request: Request, context: AppLoadContext) {
  return await terminateSession(request, context);
}

export { getSignInUrl, getSignUpUrl, signOut };
