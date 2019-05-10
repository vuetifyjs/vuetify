const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const resolve = target => path.resolve(__dirname, target)
const devTargetFolder = '../packages/vuetify/dev'
const devTargetFile = `${devTargetFolder}/Playground.vue`

if (!fs.existsSync(resolve(devTargetFile))) {
  shell.cp(
    resolve(`${devTargetFolder}/Playground.template.vue`),
    resolve(devTargetFile)
  )
}
