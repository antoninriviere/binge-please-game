/**
 * Rename the .html filte to a .php file
 */
const fs = require('fs')
const path = require('path')
const colors = require('colors')
const ora = require('ora')

const spinner = ora(colors.bgBlue.black(' WAIT ') + ' ' + colors.blue('Running ToPHP process...'))
spinner.start()

if (fs.existsSync(path.resolve(__dirname, '../dist/index.php'))) {
    fs.unlinkSync(path.resolve(__dirname, '../dist/index.php'))
}

fs.renameSync(path.resolve(__dirname, '../dist/index.html'), path.resolve(__dirname, '../dist/index.php'))

spinner.stop()
console.log('\n')
console.log(colors.bgGreen.black(' DONE ') + ' ' + colors.green('ToPHP process finished') + '\n')
