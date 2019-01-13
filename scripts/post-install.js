const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const resolve = target => path.resolve(__dirname, target)
const targetFolder = '../packages/playground/src/views'
const targetFile = `${targetFolder}/Playground.vue`

if (!fs.existsSync(resolve(targetFile))) {
  shell.cp(
    resolve(`${targetFolder}/Playground.template.vue`),
    resolve(targetFile)
  )
}
