import semver from 'semver'
import shell from 'shelljs'
import inquirer from 'inquirer'
import lerna from '../lerna.json' with { type: 'json' }

if (process.env.CI) process.exit(0)

/**
 * @param command {string}
 * @returns {string}
 */
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
