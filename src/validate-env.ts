/*
      WORKOS_CLIENT_ID: string;
      WORKOS_COOKIE_MAX_AGE: string;
      WORKOS_COOKIE_PASSWORD: string;
      WORKOS_REDIRECT_URI: string;
    };
*/

export function validateEnv(env: Record<string, string> | unknown) {
  if (typeof env !== 'object' || env === null) {
    throw new Error('WORKOS_CLIENT_ID, WORKOS_COOKIE_MAX_AGE, WORKOS_COOKIE_PASSWORD, and WORKOS_REDIRECT_URI must be set in the environment variables');
  }

  const envObj = env as Record<string, string>;

  if (!envObj.WORKOS_CLIENT_ID) {
    throw new Error('WORKOS_CLIENT_ID is not set');
  }

  if (!envObj.WORKOS_COOKIE_PASSWORD) {
    throw new Error('WORKOS_COOKIE_PASSWORD is not set');
  }

  if (!envObj.WORKOS_REDIRECT_URI) {
    throw new Error('WORKOS_REDIRECT_URI is not set');
  }

  return true;
}
