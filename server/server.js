import express from 'express';
import path from 'path';
import proxy from 'http-proxy-middleware';

const app = express();

app.use(require('./ssrMiddleware'));
app.disable('x-powered-by');

if (process.env.NODE_ENV !== 'production') {
  // mock
  app.use(require('./mockMiddleware'));
  // roadhog
  app.use(proxy('**', {target: 'http://localhost:8000', changeOrigin: true}));
} else {
  // api, scala etc.
  app.use(proxy('/api', {target: 'http://localhost:9000', changeOrigin: true}));
  // dist
  app.use(express.static(path.join(__dirname, '../dist'), {maxAge: 86400000 * 30}));
}

// isServer tag
global.isServer = true;

const server = app.listen(8080, () => {
  const { port } = server.address();
  console.info(`Listened at http://localhost:${port}`);
});
