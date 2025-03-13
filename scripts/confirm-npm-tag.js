import semver from  'semver'
import shell from  'shelljs'
import inquirer from  'inquirer'
import lerna from  '../lerna.json' with { type: 'json' }
// const semver = require('semver')
// const shell = require('shelljs')
// const inquirer = require('inquirer')
// const version = require('../lerna.json').version

if (process.env.CI) process.exit(0)

console.log(lerna.version)
process.exit(0)

/** @param command {string} */
function exec (command) {
  const result = shell.exec(command, { silent: true })
  if (result.code) {
    shell.echo('')
    console.error(result.stdout.trim())
    shell.exit(1)
  }
  return result.stdout.trim()
}

const branch = exec('git symbolic-ref --short HEAD')
const tag = semver.prerelease(lerna.version) == null ? 'latest' : branch

shell.echo(`Releasing ${lerna.version} on ${branch}`)
shell.echo(`Tag: ${tag}`)
inquirer.prompt({
  type: 'confirm',
  name: 'yes',
  message: 'Are you sure?',
  default: true,
}).then(({ yes }) => yes || shell.exit(1))
