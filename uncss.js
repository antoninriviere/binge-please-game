/**
 * Remove unused styles CSS from final CSS file
 */

const uncss = require('uncss')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const colors = require('colors')
const ora = require('ora')

// GET CSS FILE
const cssFileAll = glob.sync(path.resolve(__dirname, 'dist/**/*.css'))[0]
const temp = cssFileAll.split('/')
const cssFile = temp.pop()
const cssPath = 'dist/static/styles/'

const spinner = ora(colors.bgBlue.black(' WAIT ') + ' ' + colors.blue('Running UnCSS process...'))
spinner.start()

// GET HTML FILES
const htmlFiles = glob.sync(path.resolve(__dirname, 'index.html')).concat(glob.sync(path.resolve(__dirname, 'src/**/*.html')))

for(let i = 0, l = htmlFiles.length; i < l; i += 1)
{
    htmlFiles[i] = '.' + htmlFiles[i].replace(__dirname, '')
}

const options = {
    ignore: [
        /is\-/,
        /u-fixed/,
        /active/,
        /hover/,
        /focus/,
        /blur/,
        /:nth-child/,
        /\-enter/,
        /\-leave/,
        /o-content/,
        /c\-/,
        /p\-/,
        /u-shape-circle/
    ],
    csspath: cssPath,
    stylesheets: [cssFile],
    timeout: 1000,
    report: true,
    htmlroot: './dist/'
}

uncss(htmlFiles, options, (error, output) =>
{
    if(error)
{
        console.log('\n')
        console.log(colors.bgRed.black(' ERROR ') + ' ' + colors.red(`UnCSS error: ${error}`))
        console.log('\n')
    }
    else
{
        const stream = fs.createWriteStream('' + cssFileAll)
        stream.once('open', () =>
{
            stream.write(output)
            stream.end()

            spinner.stop()

            console.log(colors.bgGreen.black(' DONE ') + ' ' + colors.green('UnCSS process finished') + '\n')

            console.log(colors.bgYellow.black(' INFO ') + ' ' + colors.yellow(`HTML files: ${colors.underline.bold(htmlFiles.length)}`))

            console.log(colors.bgYellow.black(' INFO ') + ' ' + colors.yellow(`Final CSS size: ${colors.underline.bold(output.length / 1000)} Ko`))
        })
    }
})
