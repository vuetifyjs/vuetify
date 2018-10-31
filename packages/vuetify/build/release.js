const inquirer = require('inquirer')
const semver = require('semver')
const shell = require('shelljs')

shell.set('-e')

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

if (!shell.which('npm')) {
  shell.echo('Sorry, this script requires npm')
  shell.exit(1)
}

let tag
let branch = exec('git symbolic-ref --short HEAD')
const latest = exec('npm view vuetify version')
let latestGit = exec('git describe --abbrev=0 --tags')

shell.echo(`
Current branch is ${branch}
Last git version (from the current location) was ${latestGit}
Latest npm version is ${latest}
`)

promptForVersion()
  .then(verifyBranch)
  .then(confirmVersion)
  .then(version => {
    lint()
    release(version)
  })

//============================ FUNCTIONS =============================//

function exec (command) {
  const result = shell.exec(command, { silent: true })
  if (result.code) {
    shell.echo('')
    console.error(result.stdout.trim())
    shell.exit(1)
  }
  return result.stdout.trim()
}

function createVersionOption (name) {
  const prerelease = (semver.prerelease(latestGit) || [])[0]
  const version = semver.inc(latestGit, name.toLowerCase(), false, prerelease || 'beta')
  return {
    name: `${name} (${version})`,
    value: version,
    short: version
  }
}

function promptForVersion () {
  return inquirer.prompt({
    type: 'list',
    name: 'version',
    message: 'Select new version:',
    choices: [
      createVersionOption('Major'),
      createVersionOption('Minor'),
      createVersionOption('Patch'),
      createVersionOption('Prerelease'),
      createVersionOption('Premajor'),
      createVersionOption('Preminor'),
      createVersionOption('Prepatch'),
      {
        name: 'Other',
        value: 'other'
      }
    ],
    default: () => (
      semver.prerelease(latestGit) == null
        ? createVersionOption('Patch').value
        : createVersionOption('Prerelease').value
    ),
    pageSize: 8
  }).then(({ version }) => {
    if (version === 'other') {
      return inquirer.prompt({
        type: 'input',
        name: 'version',
        message: 'Enter new version:',
        validate: val => !!semver.valid(val) || `'${val}' is not a valid version number`,
        filter: val => semver(val).version
      }).then(({ version }) => version)
    }
    return version
  })
}

function verifyBranch (version) {
  tag = semver.prerelease(version) == null ? 'latest' : 'next'

  if (tag === 'latest' && branch !== 'master') {
    shell.echo('\nReleasing on a branch other than \'master\'')
    shell.echo('This may have unintended side-effects')
    return inquirer.prompt({
      type: 'confirm',
      name: 'yes',
      message: 'Do you want to continue?',
      default: false
    }).then(({ yes }) => yes ? version : shell.exit(1))
  }
  return Promise.resolve(version)
}

function confirmVersion (version) {
  shell.echo(`Releasing ${version} on ${branch}`)
  shell.echo(`Tag: ${tag}`)
  return inquirer.prompt({
    type: 'confirm',
    name: 'yes',
    message: 'Are you sure?',
    default: true
  }).then(({ yes }) => yes ? version : shell.exit(1))
}

function lint () {
  shell.exec('npm run lint')
  shell.exec('npm run test')
}

function release (version) {
  process.env.npm_config_commit_hooks = 'false'

  shell.exec(`npm version ${version} --message "[release] ${version}"`)
  shell.exec(`git push --no-verify --follow-tags`)

  if (branch === 'master') {
    shell.exec('git checkout dev')
    branch = 'dev'
    shell.exec('git pull --ff-only')
    shell.exec('git merge master')

    if (exec('git status --porcelain') === '') {
      shell.exec('git push --no-verify')
    } else {
      shell.echo('Please resolve conflicts then push the current branch')
    }
  }
}
