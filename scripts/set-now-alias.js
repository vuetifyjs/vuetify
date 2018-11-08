const fs = require('fs')
const config = require('../now.json')
const pkg = require('../package.json')

const alias = process.argv[2]

if (!alias) {
  console.error('Alias not defined')
  process.exit(1)
}

config.alias = alias

fs.writeFileSync(
  require.resolve('../now.json'),
  JSON.stringify(config, null, 2)
)
fs.writeFileSync(
  require.resolve('../package.json'),
  JSON.stringify(pkg, null, 2)
)
