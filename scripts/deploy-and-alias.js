const shell = require('shelljs')

const alias = {
  'refs/heads/master': 'vuetifyjs.com',
  'refs/heads/dev': 'dev.vuetifyjs.com',
  'refs/heads/next': 'next.vuetifyjs.com',
}[process.argv[2]]

if (!alias) {
  console.error('Alias not defined')
  process.exit(1)
}

const options = {
  env: {
    ...process.env,
    VERCEL_PROJECT_ID: 'prj_g3MO7ck0yciUrIbtahRVD9epWbYJ',
    VERCEL_ORG_ID: 'team_MYQkaFitxJXQ2v3dioJaj2nx',
  },
}

const child = shell.exec('vercel --scope=vuetifyjs --token=$NOW_TOKEN --confirm', options)
if (child.code !== 0) {
  process.exit(child.code)
}
const instanceUrl = child.stdout

shell.exec(`vercel alias set ${instanceUrl} ${alias} --scope=vuetifyjs --token=$NOW_TOKEN`, options)
