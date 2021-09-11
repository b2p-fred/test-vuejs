const webpack = require("webpack");

const fs = require("fs");
const packageJson = fs.readFileSync("./package.json");
console.log(packageJson)
const appName = JSON.parse(packageJson).name || "Unnamed";
const appVersion = JSON.parse(packageJson).version || 0;
const appDescription = JSON.parse(packageJson).description || "";

let plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      APP_NAME: JSON.stringify(appName),
      APP_VERSION: JSON.stringify(appVersion),
      APP_COMMENTS: JSON.stringify(appDescription),
    },
  }),
];

if (process.env.BUNDLE_ANALYSIS === "1") {
  const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  configureWebpack: () => {
    return {
      plugins: plugins,
    };
  },

  // Enable Hot-Reloading with vue-cli-service serve
  devServer: {
    watchOptions: {
      poll: true,
    },
  },

  // Support for IE 11/Safari 9
  transpileDependencies: ["vuetify"],

  // PWA specific configuration
  pwa: {
    name: "My front app",
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },
};
