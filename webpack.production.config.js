const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'lib/public');
const mainPath = path.resolve(__dirname, 'src/client/index.tsx');
const config = {
    entry: [
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
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    'awesome-typescript-loader?target=es5'
                ]
            },
            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false, compress: { warnings: false } }),
    ]
}

module.exports = config;
