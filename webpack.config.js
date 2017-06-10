const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: './src/sudoku/main.js',
    devtool: 'eval-source-map',
    output: {
        path: path.join(__dirname, '/public/'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                include: path.join(__dirname, 'src'),
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
