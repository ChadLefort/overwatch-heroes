const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'lib/public');
const mainPath = path.resolve(__dirname, 'src/client/app.tsx');
const config = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        mainPath
    ],
    output: {
        filename: 'bundle.js',
        path: buildPath,
        publicPath: '/public/'
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        stats: 'errors-only',
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    'react-hot-loader/webpack',
                    'awesome-typescript-loader?target=es5'
                ]
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
            { test: /\.(jpe|jpg|png|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'file-loader' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;
