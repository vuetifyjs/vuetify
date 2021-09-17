const shell = require('shelljs')

const alias = {
  'refs/heads/master': 'vuetifyjs.com',
  'refs/heads/dev': 'dev.vuetifyjs.com',
  'refs/heads/docs/import-next': 'next.vuetifyjs.com',
}[process.argv[2]]

if (!alias) {
  console.error('Alias not defined')
  process.exit(1)
}

const options = {
  env: process.env,
}

const child = shell.exec('now --scope=vuetifyjs --token=$NOW_TOKEN --confirm', options)
if (child.code !== 0) {
  process.exit(child.code)
}
const instanceUrl = child.stdout

shell.exec(`now alias set ${instanceUrl} ${alias} --scope=vuetifyjs --token=$NOW_TOKEN`, options)
