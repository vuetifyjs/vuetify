import fs from 'node:fs'

const reset = '\x1b[0m'
const red = '\x1b[31m'
const bright = '\x1b[1m'

const yarn = fs.existsSync('yarn.lock')
const npm = fs.existsSync('package-lock.json')
if (yarn || npm) {
  const name = yarn ? 'yarn' : 'npm'
  const lock = yarn ? 'yarn.lock' : 'package-lock.json'
  console.log()
  console.log(`${red}WARNING:${reset}`)
  console.log(`This project uses ${bright}pnpm${reset}. Installing its dependencies with ${bright}${name}${reset} may result in errors`)
  console.log(`Please remove ${bright}${lock}${reset} and try again, with pnpm this time`)
  console.log(`See ${bright}https://pnpm.io/${reset}`)
  console.log()
  process.exit(1)
}
