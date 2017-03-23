/* eslint-disable */

const webpack = require('webpack')
const path = require('path')
const packageConfig = require('./package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// const prod = process.env.NODE_ENV == 'production'
const extractCSS = new ExtractTextPlugin('style.css')
const BabiliPlugin = require("babili-webpack-plugin");
// const parameters = require('./parameters.json')
// const Imagemin = require('imagemin-webpack-plugin').default

let config = {
    // parameters,
    entry: __dirname + '/templates/js/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/output/assets/js',
        publicPath: './',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                 test: /(\.js)$/,
                 loader: 'babel-loader',
                 exclude: /(node_modules)/
            }
        ]
    },
    plugins: [
        new BabiliPlugin()
    ]
}



module.exports = config