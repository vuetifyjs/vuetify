const fs = require('fs')
const config = require('../now.json')

const alias = process.argv[2]

if (!alias) {
  console.error('Alias not defined')
  process.exit(1)
}

config.alias = alias
config.files = [
  'packages/api-generator/dist',
  'packages/api-generator/package.json',
  'packages/vuetify/dist',
  'packages/vuetify/lib',
  'packages/vuetify/es5',
  'packages/vuetify/src',
  'packages/vuetify/types',
  'packages/vuetify/package.json',
  'packages/vuetifyjs.com/dist',
  'packages/vuetifyjs.com/src',
  'packages/vuetifyjs.com/server.js',
  'packages/vuetifyjs.com/package.json',
  'package.json',
  'lerna.json',
  'yarn.lock'
]

fs.writeFileSync(
  require.resolve('../now.json'),
  JSON.stringify(config, null, 2)
)
