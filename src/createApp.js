import React from 'react';
import dva from 'dva';
import { RouterContext } from 'dva/router';
import router from './router';

export default function createApp(opts, isServer) {
  // 1. Initialize
  const app = dva(opts);

  // 2. Plugins
  // app.use({});

  // 3. Model
  // app.model(require('./models/example'));

  if (isServer) {
    app.router(({ history, renderProps}) => {
      return <RouterContext {...renderProps} />;
    });
  } else {
    // 4. Router
    app.router(router);
  }
  return app;
}
