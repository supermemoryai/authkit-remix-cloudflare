import { getWorkos } from './workos.js';
import { GetAuthURLOptions } from './interfaces.js';
import { ArgsWithContext } from './type.js';

async function getAuthorizationUrl(options: GetAuthURLOptions = {}, context: ArgsWithContext['context']) {
  const { returnPathname, screenHint } = options;

  const workos = getWorkos(context);

  return workos.userManagement.getAuthorizationUrl({
    provider: 'authkit',
    clientId: context.env.WORKOS_CLIENT_ID,
    redirectUri: context.env.WORKOS_REDIRECT_URI,
    state: returnPathname ? btoa(JSON.stringify({ returnPathname })) : undefined,
    screenHint,
  });
}

export { getAuthorizationUrl };
