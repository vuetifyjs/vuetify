'use strict'
const spawn = require('child_process').spawn

const args = process.argv.slice(2)

let child

if (process.platform === 'win32') {
  // yarn test -i
  child = spawn('yarn.cmd', ['test:win32', ...args], { stdio: 'inherit' })
} else {
  // yarn test
  child = spawn('yarn', ['test:unix', ...args], { stdio: 'inherit' })
}

child.on('exit', process.exit)
