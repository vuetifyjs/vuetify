const spawn = require('cross-spawn')

let target = process.argv[2]
const alias = {
  api: '@vuetify/api-generator',
  docs: 'vuetifyjs.com',
  dev: 'vuetify',
}
target = alias[target] || target

let result
if (!target) {
  result = spawn.sync('yarn', ['lerna', 'run', 'build', '--stream'], { stdio: 'inherit' })
} else {
  result = spawn.sync('yarn', ['lerna', 'run', 'build', '--scope', target, '--stream', '--no-prefix'], { stdio: 'inherit' })
}

process.exitCode = result.status
