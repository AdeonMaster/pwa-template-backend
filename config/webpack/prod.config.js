const webpackNodeExternals = require('webpack-node-externals');

const rules = require('./rules');
const {
  packageVersionPlugin,
  envPlugin,
  terserPlugin,
  copyWebpackPlugin,
  webpackShellPlugin,
} = require('./plugins');

const mode = 'production';

console.log('Production build..');

module.exports = () => ({
  mode,
  target: 'node',
  externals: [webpackNodeExternals()],
  entry: {
    'server': './src/server.js',
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'false',
  optimization: {
    minimizer: [
      terserPlugin
    ],
  },
  node: {
    __dirname: false
  },
  plugins: [
    envPlugin(mode),
    packageVersionPlugin(),
    copyWebpackPlugin,
    webpackShellPlugin({
      onBuildEnd: ['npm run swagger-build']
    })
  ],
  module: {
    rules
  }
});
