import { createBackend } from '@backstage/backend-defaults';
import codefreeseHelloPlugin  from '@internal/plugin-codefreese-hello-backend';
import konnectBackendPlugin from '@internal/plugin-konnect-backend';

const backend = createBackend();
backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);
backend.add(codefreeseHelloPlugin);
backend.add(konnectBackendPlugin);
backend.start();