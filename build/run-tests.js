"use strict"
const spawn = require("child_process").spawn

const args = process.argv.slice(2)

if (process.platform === 'win32') {
  // yarn test -i
  spawn('yarn.cmd', ['test:win32', ...args], { stdio: 'inherit' })
} else {
  // yarn test
  spawn('yarn', ['test:unix', ...args], { stdio: 'inherit' })
}
