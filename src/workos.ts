import { AppLoadContext } from '@remix-run/cloudflare';
import { WorkOS } from '@workos-inc/node';

const VERSION = '0.4.0';

const getWorkos = (context: AppLoadContext) => {
  if (!context.cloudflare.env) {
    throw new Error('WORKOS_API_KEY, WORKOS_CLIENT_ID, WORKOS_COOKIE_MAX_AGE, WORKOS_COOKIE_PASSWORD, and WORKOS_REDIRECT_URI must be set in the environment variables');
  }
  const options = {
    apiHostname: (context.cloudflare.env as Record<string, string>).WORKOS_API_HOSTNAME,
    https: (context.cloudflare.env as Record<string, string>).WORKOS_API_HTTPS ? (context.cloudflare.env as Record<string, string>).WORKOS_API_HTTPS === 'true' : true,
    port: (context.cloudflare.env as Record<string, string>).WORKOS_API_PORT ? parseInt((context.cloudflare.env as Record<string, string>).WORKOS_API_PORT) : undefined,
    appInfo: {
      name: 'authkit-remix',
      version: VERSION,
    },
  };

  return new WorkOS((context.cloudflare.env as Record<string, string>).WORKOS_API_KEY, options);
};

export { getWorkos };
