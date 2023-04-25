const { composePlugins } = require('@nrwl/rspack');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const webpack = require('webpack');

module.exports = composePlugins((config) => {
  config.context = __dirname;
  // config.entry = {
  //   main: './dist/main.js'
  // };
  config.entry = {
    main: {
      import: ['/Users/douglasmachado/Documents/NX/agora/nest-master/sample/14-mongoose-base/src/main.ts']
    }
  };
  config.externals = {
    '@nestjs/common': '@nestjs/common',
    '@nestjs/core': '@nestjs/core',
    'tslib': 'tslib',
  };
  //config.externals = Object.fromEntries(externals.map(e => [e, `"${e}"`]))
  config.externalsPresets = {node: true}
  config.externalsType = 'commonjs';
  config.target = "node";

  // config.entry = '/Users/douglasmachado/Documents/NX/agora/nest-master/sample/14-mongoose-base/dist/main.js';
  //config.entry.main = "./dist/main.js";

    // config.entry.main.import = ["./dist/main.js"];

//   config.devServer = {
//     port: 3000
//    };
//   config.plugins = [new RunScriptWebpackPlugin({ name: 'main.js', autoRestart: false })]
config.plugins = [
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
  ];
  return config;
});
