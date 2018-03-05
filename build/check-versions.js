const colors = require('colors')
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

function exec (cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [{
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
}]

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    })
}

module.exports = () => {
    const warnings = []

    versionRequirements.forEach(mod => {
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(`${mod.name}: ${colors.red(mod.currentVersion)} should be ${colors.green(mod.versionRequirement)}`)
        }
    })

    if (warnings.length) {
        console.log('')
        console.log(colors.yellow('To use this template, you must update following to modules:'))
        console.log()

        for (var i = 0; i < warnings.length; i++) {
            const warning = warnings[i]

            console.log(`  ${warning}`)
        }

        console.log()
        process.exit(1)
    }
}
