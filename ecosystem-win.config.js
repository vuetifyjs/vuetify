// PM2 process file
// http://pm2.keymetrics.io/docs/usage/application-declaration/

const fs = require('fs')

const separator = process.platform === 'win32' ? ';' : ':'
const paths = process.env.PATH.split(separator).map(p => `${p}/yarn.js`)
const yarnjsPaths = [
  'c:/Program Files (x86)/yarn/bin/yarn.js',
  'c:/Program Files/yarn/bin/yarn.js',
].concat(paths)

const yarnjsPath = yarnjsPaths.find(fs.existsSync)
if (!yarnjsPath) {
  const checkedPaths = yarnjsPaths.reduce((prev, curr) => `${prev}\n${curr}`)
  throw new Error(`Yarn.js not found in any of these paths:\n${checkedPaths}`)
}

module.exports = {
  apps: [
    {
      name: 'vuetify-dev',
      script: yarnjsPath,
      cwd: './packages/vuetify/',
      args: 'dev',
    },
    {
      name: 'vuetify-build',
      script: yarnjsPath,
      cwd: './packages/vuetify/',
      args: 'watch',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'vuetify-docs',
      script: yarnjsPath,
      cwd: './packages/docs/',
      args: 'dev',
    },
  ],
}
