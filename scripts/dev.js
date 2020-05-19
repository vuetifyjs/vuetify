const spawn = require('cross-spawn')

let target = process.argv[2]
const alias = {
  docs: 'vuetifyjs.com',
}
target = alias[target] || target

if (!target) {
  spawn('yarn', ['lerna', 'run', 'dev', '--scope', 'vuetify', '--stream'], { stdio: 'inherit' })
} else {
  spawn('yarn', ['lerna', 'run', 'dev', '--scope', target, '--stream'], { stdio: 'inherit' })
}
