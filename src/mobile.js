import { browserHistory } from 'dva/router';
import createApp from './createApp';
import './index.css';

const app = createApp({
  history: browserHistory,
  initialState: window.__INITIAL_STATE__
}, /* isServer */false, /* isMobile */true);
delete window.__INITIAL_STATE__;

// 5. Start
app.start('#root');
