import { ArgsWithContext } from './type.js';
import { getAuthorizationUrl } from './get-authorization-url.js';
import { terminateSession } from './session.js';

async function getSignInUrl(context: ArgsWithContext['context']) {
  return getAuthorizationUrl({ screenHint: 'sign-in' }, context);
}

async function getSignUpUrl(context: ArgsWithContext['context']) {
  return getAuthorizationUrl({ screenHint: 'sign-up' }, context);
}

async function signOut(request: Request, context: ArgsWithContext['context']) {
  return await terminateSession(request, context);
}

export { getSignInUrl, getSignUpUrl, signOut };
