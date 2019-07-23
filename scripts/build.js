const child = require('child_process')

let target = process.argv[2]
const alias = {
  api: '@vuetify/api-generator',
  docs: 'vuetifyjs.com',
  kitchen: '@vuetify/kitchen',
  dev: 'vuetify',
}
target = alias[target] || target

if (!target) {
  child.spawn('yarn', ['lerna', 'run', 'build', '--stream'], { stdio:'inherit', shell: true })
} else {
  child.spawn('yarn', ['lerna', 'run', 'build', `--scope ${target}`, '--stream'], { stdio:'inherit', shell: true })
}
