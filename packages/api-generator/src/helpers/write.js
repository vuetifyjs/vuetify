const fs = require('fs')
const path = require('path')

function ensureDirectoryExists (filePath) {
  const folderPath = path.resolve(path.dirname(filePath))
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }
}

function writeApiFile (obj, file) {
  ensureDirectoryExists(file)
  const stream = fs.createWriteStream(file)

  const comment = `/*
  * THIS FILE HAS BEEN AUTOMATICALLY GENERATED USING THE API-GENERATOR TOOL.
  *
  * CHANGES MADE TO THIS FILE WILL BE LOST!
  */

`

  stream.once('open', () => {
    stream.write(comment)
    stream.write('module.exports = ')
    stream.write(JSON.stringify(obj, null, 2))
    stream.write('\n')
    stream.end()
  })
}

function writeJsonFile (obj, file) {
  ensureDirectoryExists(file)
  const stream = fs.createWriteStream(file)

  stream.once('open', () => {
    stream.write(JSON.stringify(obj, null, 2))
    stream.end()
  })
}

function writePlainFile (content, file) {
  ensureDirectoryExists(file)
  const stream = fs.createWriteStream(file)

  stream.once('open', () => {
    stream.write(content)
    stream.end()
  })
}

module.exports = {
  writeApiFile,
  writeJsonFile,
  writePlainFile,
}
