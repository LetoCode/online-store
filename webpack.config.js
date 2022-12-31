const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/ts/index'),
    //mode: 'development',
    output: {
        //publicPath: 'dist',
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        //assetModuleFilename: 'src/assets/images/[name].[ext]',
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.(png|ico|gif|jpg|jpeg|svg|mp3|wav|webp)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(json)$/i,
                type: 'json',
            },
            {
                test: /\.(htaccess)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src/ts')]
            },

        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: 'ts' }),
        new CopyPlugin({
            patterns: [
                { from: './src/public' },
            ],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
