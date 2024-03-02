import { loggerToWinstonLogger } from '@backstage/backend-common';
import {
  createBackendPlugin,
  coreServices,
} from '@backstage/backend-plugin-api';

import { createRouter } from './service/router';

/**
 * The Todos plugin is responsible for aggregating todo comments within source.
 * @public
 */
export const codefreeseHelloPlugin = createBackendPlugin({
  pluginId: 'codefreese-hello',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        http: coreServices.httpRouter,
      },
      async init({ http, logger }) {
        http.use(
          await createRouter({
            logger: loggerToWinstonLogger(logger),
          }),
        );
      },
    });
  },
});