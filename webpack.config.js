const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: {
        client: './src/js/scripts.js',
        server: './src/js/server.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.json$/,
                type: 'json'
            },
        ],
    },
    resolve: {
        fallback: {
            http: require.resolve('stream-http'),
            zlib: require.resolve('browserify-zlib'),
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
            fs: false,
            crypto: require.resolve('crypto-browserify'),
            path: require.resolve('path-browserify'),
            url: require.resolve('url/'),
            vm: require.resolve('vm-browserify'),
            assert: require.resolve('assert/'),
            util: require.resolve('util/')
        }
    },
};
