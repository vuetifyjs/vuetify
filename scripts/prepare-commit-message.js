import fs from 'node:fs'

const [messageFile, commitType] = process.argv.slice(2)

if (commitType == null) {
  const currentMessage = fs.readFileSync(messageFile)
  const newMessage = fs.readFileSync('.github/.git_commit_msg.txt')
  fs.writeFileSync(messageFile, newMessage)
  fs.appendFileSync(messageFile, currentMessage)
}
