const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            Styles: path.resolve(__dirname, '../src/styles'),
            Components: path.resolve(__dirname, '../src/scripts/components'),
            Utils: path.resolve(__dirname, '../src/scripts/utils'),
            Mixins: path.resolve(__dirname, '../src/scripts/mixins'),
            Config: path.resolve(__dirname, '../src/scripts/config'),
            Static: path.resolve(__dirname, '../static'),
            WebGLConfig: path.resolve(__dirname, '../src/scripts/webgl/config'),
            WebGLCore: path.resolve(__dirname, '../src/scripts/webgl/core'),
            WebGLUtils: path.resolve(__dirname, '../src/scripts/webgl/utils')
        }
    },
    module: {
        rules: [{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src'), resolve('test')],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(glsl|frag|vert)$/,
            exclude: /node_modules/,
            loaders: [
            'raw-loader',
            'glslify'
            ]
        }]
    }
}
