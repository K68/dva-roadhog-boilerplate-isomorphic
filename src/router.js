import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

export const routes = (
  <div>
    <Route path="/" component={IndexPage} />
    <Route path="/about" component={IndexPage} />
  </div>
);

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
}

export default RouterConfig;
