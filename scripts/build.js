const spawn = require('cross-spawn')

let target = process.argv[2]
const alias = {
  api: '@vuetify/api-generator',
  docs: 'vuetifyjs.com',
  dev: 'vuetify',
}
target = alias[target] || target

if (!target) {
  spawn('yarn', ['lerna', 'run', 'build', '--stream'], { stdio: 'inherit' })
} else {
  spawn('yarn', ['lerna', 'run', 'build', '--scope', target, '--stream'], { stdio: 'inherit' })
}
