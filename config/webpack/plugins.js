const fs = require('fs');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const envPlugin = (mode = 'development') => new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(mode)
  }
});

const packageVersionPlugin = () => {
  const packageJson = fs.readFileSync('./package.json')
  const version = JSON.parse(packageJson).version || 0;

  return new webpack.DefinePlugin({
    'process.env': {
      PACKAGE_VERSION: `"${version}"`
    }
  });
}

const webpackShellPlugin = options => new WebpackShellPlugin(options);

module.exports = {
  packageVersionPlugin,
  envPlugin,
  terserPlugin: new TerserPlugin({
    cache: true,
    parallel: true,
    sourceMap: true,
    extractComments: true
  }),
  copyWebpackPlugin: new CopyWebpackPlugin({
    patterns: [
      { from: 'static' },
    ],
  }),
  webpackShellPlugin,
};
