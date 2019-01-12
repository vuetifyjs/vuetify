const shell = require('shelljs')

const target = process.argv[2]

if (!target) {
  shell.exec('lerna run dev --scope vuetify --stream')
} else {
  shell.exec(`lerna run dev --scope ${target} --stream`)
}
