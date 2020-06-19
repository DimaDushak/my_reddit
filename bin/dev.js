const path = require('path');
const nodemon = require('nodemon');
const webpack = require('webpack');
const [webpackClientConfig, webpackServerConfig] = require('../webpack.config');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const clientCompiler = webpack(webpackClientConfig);
const hmrServer = express();

hmrServer.use(webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    noInfo: true,
    stats: 'errors-only',
    watchOptions: {
        ignore: '/dist/'
    },
    writeToDisk: true,
    serverSideRender: true
}));

hmrServer.use(webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr'
}));

hmrServer.listen(3001, () => {
    console.log('HMR server started successfully');
})

const serverCompiler = webpack(webpackServerConfig);

serverCompiler.run((err) => {
    if (err) {
        console.log('Compilation failed: ', err);
    }

    serverCompiler.watch({}, (err) => {
        if (err) {
            console.log('Compilation failed: ', err);
        }

        console.log('Compilation was successfully');
    });

    nodemon({
        script: path.resolve(__dirname, '../dist/server/server.js'),
        watch: [
            path.resolve(__dirname, '../dist/server'),
            path.resolve(__dirname, '../dist/client')
        ]
    });
});