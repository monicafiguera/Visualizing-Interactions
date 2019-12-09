const webpack = require('webpack');

const config = {
    entry:  __dirname + '/js/index.jsx',
    mode: "development",
    output: {
        path: __dirname + '/js/libs',
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
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: "html-loader",
                    options: { minimize: true }
                } ]
            }
        ]
    },
};
module.exports = config;