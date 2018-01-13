const fs = require('fs')

const reset = '\x1b[0m'
const red = '\x1b[31m'

const [messageFile] = process.env.GIT_PARAMS.split(' ')
const currentMessage = fs.readFileSync(messageFile, 'utf8')

function check (message, cb) {
  if (cb(currentMessage)) {
    console.error(red + message + reset)
    process.exit(1)
  }
}

check('whitespace at beginning of message', m => /^\s/.test(m))
check('commit message title is too long. limit to 72 chars', m => m.split(/\r?\n/, 1)[0].length > 72)
check('message title and body must be separated by a blank line', m => {
  const s = m.split(/\r?\n/, 3)
  return s[1] != null && !!s[1].length
})
