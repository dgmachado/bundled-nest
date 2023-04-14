const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = {
  entry: ['./src/main.ts'],
  target: 'node',
  // externals: [
  //   nodeExternals(),
  // ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
   // new RunScriptWebpackPlugin({ name: 'server.js', autoRestart: false }),
    new webpack.IgnorePlugin({
      /**
       * There is a small problem with Nest's idea of lazy require() calls,
       * Webpack tries to load these lazy imports that you may not be using,
       * so we must explicitly handle the issue.
       * Refer to: https://github.com/nestjs/nest/issues/1706
       */
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/core',
          '@nestjs/microservices',
          '@nestjs/platform-express',
          'cache-manager',
          'class-validator',
          'class-transformer',
          // ADD THIS
         '@nestjs/microservices/microservices-module',
         '@nestjs/websockets',
         'socket.io-adapter',
         'utf-8-validate',
         'bufferutil',
         'kerberos',
         '@mongodb-js/zstd',
         'snappy',
         '@aws-sdk/credential-providers',
         'mongodb-client-encryption',
         '@nestjs/websockets/socket-module',
         'bson-ext',
         'snappy/package.json'
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};