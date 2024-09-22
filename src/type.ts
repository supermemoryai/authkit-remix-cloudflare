import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export type ArgsWithContext = LoaderFunctionArgs & {
    context: {
      env: {
        WORKOS_API_KEY: string;
        WORKOS_CLIENT_ID: string;
        WORKOS_COOKIE_MAX_AGE: string;
        WORKOS_COOKIE_PASSWORD: string;
        WORKOS_REDIRECT_URI: string;
        [key: string]: string;
      };
    };
  };

  export const cookieName = 'wos-session';