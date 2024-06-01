const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            server: './src/js/server.js',
            client: './src/js/scripts.js' // Add entry point for client-side code
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist/js'),
        },
        target: isProduction ? 'node' : 'web', // Specify target environment
        node: {
            __dirname: false, // Ensure __dirname is not rewritten
        },
        externals: isProduction ? [nodeExternals()] : [], // Exclude node_modules in production
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
            ],
        },
        resolve: {
            fallback: {
                http: require.resolve('stream-http'),
                zlib: require.resolve('browserify-zlib'),
                buffer: require.resolve('buffer/'),
                stream: require.resolve('stream-browserify'),
                fs: false, // Do not include a polyfill for fs
                crypto: require.resolve('crypto-browserify'),
                path: require.resolve('path-browserify'),
                url: require.resolve('url/'),
                vm: require.resolve('vm-browserify'),
                assert: require.resolve('assert/'),
                util: require.resolve('util/')
            }
        },
    };
};
