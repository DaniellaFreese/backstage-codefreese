import { 
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
} from '@backstage/core-plugin-api';

import { KonnectBackendClient } from './api/KonnectBackendClient';

import { konnectApiRef } from './types';
import { rootRouteRef } from './routes';

export const konnectFrontendPlugin = createPlugin({
  id: 'konnect-frontend',
  apis: [
    createApiFactory({
      api: konnectApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
      },
      factory: ({ discoveryApi }) =>
        new KonnectBackendClient({ discoveryApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const KonnectFrontendPage = konnectFrontendPlugin.provide(
  createRoutableExtension({
    name: 'KonnectFrontendPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
