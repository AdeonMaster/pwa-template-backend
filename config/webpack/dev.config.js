const webpackNodeExternals = require('webpack-node-externals');

const rules = require('./rules');
const {
  packageVersionPlugin, envPlugin, copyWebpackPlugin, webpackShellPlugin
} = require('./plugins');

const mode = 'development';

console.log('Development build..');

module.exports = () => ({
  mode,
  target: 'node',
  externals: [webpackNodeExternals()],
  devtool: 'false',
  entry: {
    'server': './src/server.js',
  },
  output: {
    filename: '[name].js',
    publicPath: '/'
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
