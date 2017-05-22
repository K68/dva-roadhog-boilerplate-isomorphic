const path = require('path');
import pxtorem from 'postcss-pxtorem';
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, './src/asserts/svg'), // 业务代码本地私有 svg 存放目录
];

export default {
  "entry": "src/index.js",  // change for desktop or mobile || antd-mobile ssr bugs, then use hashHistory instead?
  "svgSpriteLoaderDirs": svgSpriteDirs,
  "disableCSSModules": false,
  "extraBabelPlugins": [
    "transform-runtime",
    ["import", { "libraryName": "antd", "style": "css" }],
    ["import", {"libraryName": "antd-mobile", "style": true}]
  ],
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 16,   // change for desktop: 16 or mobile: 100
      propWhiteList: []
    })
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  }
}
