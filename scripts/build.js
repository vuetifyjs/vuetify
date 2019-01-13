const shell = require('shelljs')

let target = process.argv[2]
const alias = {
  api: '@vuetify/api-generator',
  docs: 'vuetifyjs.com'
}
target = alias[target] || target

if (!target) {
  shell.exec('lerna run build --stream')
} else {
  shell.exec(`lerna run build --scope ${target} --stream`)
}
