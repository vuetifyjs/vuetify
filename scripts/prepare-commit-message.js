const fs = require('fs')

const [
  messageFile,
  commitType,
] = process.env.HUSKY_GIT_PARAMS.split(' ')

if (commitType == null) {
  const currentMessage = fs.readFileSync(messageFile)
  const newMessage = fs.readFileSync('.github/.git_commit_msg.txt')
  fs.writeFileSync(messageFile, newMessage)
  fs.appendFileSync(messageFile, currentMessage)
}
