import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { konnectFrontendPlugin, KonnectFrontendPage } from '../src/plugin';

createDevApp()
  .registerPlugin(konnectFrontendPlugin)
  .addPage({
    element: <KonnectFrontendPage />,
    title: 'Root Page',
    path: '/konnect-frontend'
  })
  .render();
