export default {
  "entry": "src/index.js",
  "disableCSSModules": false,
  "extraBabelPlugins": [
    "transform-runtime"
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  }
}
