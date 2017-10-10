const fs = require('fs')

const [
  messageFile,
  commitType,
  commitHash
] = process.env.GIT_PARAMS.split(' ')
// const currentMessage = fs.readFileSync(messageFile, { encoding: 'utf8' })

if (commitType == null) {
  const newMessage = fs.readFileSync('.github/.git_commit_msg.txt')
  fs.writeFileSync(messageFile, newMessage)
}
