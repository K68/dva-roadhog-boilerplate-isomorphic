import React from 'react';
import dva from 'dva';
import { RouterContext } from 'dva/router';
import { RouterConfig } from './router';

export const createApp = (opts, isServer) => {
  // 1. Initialize
  const app = dva(opts);

  // 2. Plugins
  // app.use({});

  // 3. Model
  // app.model(require('./models/example'));

  // 4. Router
  if (isServer) {
    app.router(({ history, renderProps}) => {
      return <RouterContext {...renderProps} />;
    });
  } else {
    app.router(RouterConfig);
  }
  return app;
};
