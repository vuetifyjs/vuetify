const fs = require('fs')

const reset = '\x1b[0m'
const red = '\x1b[31m'
const bright = '\x1b[1m'

if (fs.existsSync('package-lock.json')) {
  console.log()
  console.log(`${red}WARNING:${reset}`)
  console.log(`This project uses ${bright}Yarn${reset}. Installing its dependencies with ${bright}npm${reset} may result in errors`)
  console.log(`Please remove ${bright}package-lock.json${reset} and try again, with yarn this time`)
  console.log(`See ${bright}https://yarnpkg.com/${reset}`)
  console.log()
  process.exit(1)
}
