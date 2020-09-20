const path = require('path');

const jsRules = {
  test: /\.js?/,
  include: path.resolve(__dirname, '../../src'),
  use: [
    'babel-loader', 'eslint-loader'
  ]
};

module.exports = [
  jsRules
];
