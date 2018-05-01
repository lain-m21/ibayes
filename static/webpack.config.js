const webpack = require('webpack')

const config = {
    watch: true,
    devServer: {
        contentBase: 'dist',
        port: 3000,
        open: true
    },
    entry: __dirname + '/js/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
        ]
    },
};

module.exports = config;