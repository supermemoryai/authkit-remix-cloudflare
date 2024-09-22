/*
      WORKOS_CLIENT_ID: string;
      WORKOS_COOKIE_MAX_AGE: string;
      WORKOS_COOKIE_PASSWORD: string;
      WORKOS_REDIRECT_URI: string;
    };
*/

export function validateEnv(env: Record<string, string>) {
  if (!env.WORKOS_CLIENT_ID) {
    throw new Error('WORKOS_CLIENT_ID is not set');
  }

  if (!env.WORKOS_COOKIE_MAX_AGE) {
    throw new Error('WORKOS_COOKIE_MAX_AGE is not set');
  }

  if (!env.WORKOS_COOKIE_PASSWORD) {
    throw new Error('WORKOS_COOKIE_PASSWORD is not set');
  }

  if (!env.WORKOS_REDIRECT_URI) {
    throw new Error('WORKOS_REDIRECT_URI is not set');
  }

  return true;
}
