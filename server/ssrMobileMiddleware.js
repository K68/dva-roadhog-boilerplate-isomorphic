import { match, RoutingContext, createMemoryHistory } from 'dva/router';
import { renderToString } from 'react-dom/server'
import { query } from '../src/services/example';
import { mobileRoutes } from '../src/router';
import createApp from '../src/createApp';

export default function(req, res, next) {
  match({
    mobileRoutes,
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      switch (renderProps.location.pathname) {
        case '/':
          query()
            .then(({ err, data }) => {
              if (err) {
                res.status(500).end(`Uncaught error: ${err}`);
                return;
              }
              const initialState = { user: data };
              const app = createApp({
                history: createMemoryHistory(),
                initialState,
              }, /* isServer */true, /* isMobile */true);
              const html = renderToString(app.start()({ renderProps }));
              res.end(renderFullPage(html, initialState));
            });
          break;
        case '/about':
          const app = createApp({
            history: createMemoryHistory(),
          }, /* isServer */true, /* isMobile */true);
          const html = renderToString(app.start()({ renderProps }));
          res.end(renderFullPage(html, {}));
          break;
        default:
          res.status(500).end(`Uncaught pathname: ${renderProps.location.pathname}`);
          break;
      }
    } else {
      next()
    }
  });
}

function renderFullPage(html, initialState) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dva Demo</title>
  <script>!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),l=o.match(/U3\/((\d+|\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector('meta[name="viewport"]');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);
  flex(100, 1);</script>
  <link rel="stylesheet" href="mobile.css" />
</head>
<body>
  <div id="root">
    <div>
      ${html}
    </div>
  </div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
  </script>
<script src="mobile.js"></script>

</body>
</html>
  `;
}
