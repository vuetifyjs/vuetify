const shell = require('shelljs')

let branch = exec('git symbolic-ref --short HEAD')

function exec (command) {
  const result = shell.exec(command, { silent: true })
  if (result.code) {
    shell.echo('')
    console.error(result.stdout.trim())
    shell.exit(1)
  }
  return result.stdout.trim()
}

if (branch === 'master') {
  shell.exec('git checkout dev')
  branch = 'dev'
  shell.exec('git pull --ff-only')
  shell.exec('git merge master')

  if (exec('git status --porcelain') === '') {
    shell.exec('git push --no-verify')
    shell.exec('git checkout master')
  } else {
    shell.echo('Please resolve conflicts then push the current branch')
  }
}
