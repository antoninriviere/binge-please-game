require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const colors = require('colors')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora(colors.bgBlue.black(' WAIT ') + ' ' + colors.blue('Building...'))
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err

    webpack(webpackConfig, (err, stats) => {
        spinner.stop()

        if (err) throw err

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        console.log(colors.bgGreen.black(' DONE ') + ' ' + colors.green('Build completed\n'))

        console.log(colors.bgYellow.black(' TIP ') + ' ' + colors.yellow('Built files are meant to be served over an HTTP server.'))
        console.log('      ' + colors.yellow('Opening index.html over file:// won\'t work.'))
    })
})
