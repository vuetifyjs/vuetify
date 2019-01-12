const shell = require('shelljs')

const target = process.argv[2]
const alias = {
  docs: 'vuetifyjs.com'
}
target = alias[target] || target

if (!target) {
  shell.exec('lerna run dev --scope vuetify --stream')
} else {
  shell.exec(`lerna run dev --scope ${target} --stream`)
}
