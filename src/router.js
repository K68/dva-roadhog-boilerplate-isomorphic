import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

export const routes = (
  <div>
    <Route path="/" component={IndexPage} />
    <Route path="/about" component={IndexPage} />
  </div>
);

export const mobileRoutes = (
  <div>
    <Route path="/" component={IndexPage} />
    <Route path="/about" component={IndexPage} />
  </div>
);

export const RouterConfig = ({ history }) => {
  return (
    <Router history={history}>
      { routes }
    </Router>
  );
};

export const MobileRouterConfig = ({ history }) => {
  return (
    <Router history={history}>
      { mobileRoutes }
    </Router>
  );
};
