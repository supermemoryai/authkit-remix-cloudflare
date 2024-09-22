import '@remix-run/server-runtime';

declare module '@remix-run/server-runtime' {
  interface AppLoadContext {
    cloudflare: {
      env: Record<string, string>;
    };
  }
}

export {};