const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/pages/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    module: {
        rules: [{
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, {loader: "css-loader"}, "postcss-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|otf|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
        ],
    },
    mode: 'development',
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
],
}