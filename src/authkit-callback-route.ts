import { HandleAuthOptions } from './interfaces.js';
import { getWorkos } from './workos.js';
import { encryptSession } from './session.js';
import { redirect, json , LoaderFunctionArgs} from '@remix-run/cloudflare';
import { validateEnv } from './validate-env.js';
import { getCookieFunctions } from './cookie.js';
import { cookieName } from './type.js';

export function authLoader(options: HandleAuthOptions = {}) {
  return async function loader({ request, context }: LoaderFunctionArgs) {
    const { returnPathname: returnPathnameOption = '/' } = options;

    const url = new URL(request.url);

    validateEnv(context.cloudflare.env);

    if (!context.cloudflare.env) {
      throw new Error('WORKOS_API_KEY, WORKOS_CLIENT_ID, WORKOS_COOKIE_MAX_AGE, WORKOS_COOKIE_PASSWORD, and WORKOS_REDIRECT_URI must be set in the environment variables');
    }

    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    let returnPathname = state ? JSON.parse(atob(state)).returnPathname : null;

    const { getSession, commitSession } = getCookieFunctions(context);


    const workos = getWorkos(context);

    if (code) {
      try {
        const { accessToken, refreshToken, user, impersonator } = await workos.userManagement.authenticateWithCode({
          clientId: (context.cloudflare.env as Record<string, string>).WORKOS_CLIENT_ID,
          code,
        });

        // Clean up params
        url.searchParams.delete('code');
        url.searchParams.delete('state');

        // Redirect to the requested path and store the session
        returnPathname = returnPathname ?? returnPathnameOption;

        // Extract the search params if they are present
        if (returnPathname.includes('?')) {
          const newUrl = new URL(returnPathname, 'https://example.com');
          url.pathname = newUrl.pathname;

          for (const [key, value] of newUrl.searchParams) {
            url.searchParams.append(key, value);
          }
        } else {
          url.pathname = returnPathname;
        }

        // The refreshToken should never be accesible publicly, hence why we encrypt it in the cookie session
        // Alternatively you could persist the refresh token in a backend database
        const encryptedSession = await encryptSession({
          accessToken,
          refreshToken,
          user,
          impersonator,
          headers: {}
        }, context);


        const session = await getSession(cookieName);

        session.set('jwt', encryptedSession);
        const cookie = await commitSession(session);

        return redirect(url.toString(), {
          headers: {
            'Set-Cookie': cookie,
          },
        });
      } catch (error) {
        const errorRes = {
          error: error instanceof Error ? error.message : String(error),
        };

        console.error(errorRes);

        return errorResponse();
      }
    }

    function errorResponse() {
      return json(
        {
          error: {
            message: 'Something went wrong',
            description: 'Couldn’t sign in. If you are not sure what happened, please contact your organization admin.',
          },
        },
        { status: 500 },
      );
    }
  };
}
