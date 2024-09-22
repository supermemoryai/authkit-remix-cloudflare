import { WorkOS } from '@workos-inc/node';
import { ArgsWithContext } from './type';

const VERSION = '0.4.0';

const getWorkos = (context: ArgsWithContext['context']) => {
  const options = {
    apiHostname: context.env.WORKOS_API_HOSTNAME,
    https: context.env.WORKOS_API_HTTPS ? context.env.WORKOS_API_HTTPS === 'true' : true,
    port: context.env.WORKOS_API_PORT ? parseInt(context.env.WORKOS_API_PORT) : undefined,
    appInfo: {
      name: 'authkit-remix',
      version: VERSION,
    },
  };
  
  return new WorkOS(context.env.WORKOS_API_KEY, options);
};

export { getWorkos };
