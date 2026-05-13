import shell from 'shelljs'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const root = path.dirname(url.fileURLToPath(import.meta.url))
const resolve = target => path.resolve(root, target)

const devTargetFolder = '../packages/vuetify/dev'
const devTargetFile = `${devTargetFolder}/Playground.vue`

if (!fs.existsSync(resolve(devTargetFile))) {
  shell.cp(
    resolve(`${devTargetFolder}/Playground.template.vue`),
    resolve(devTargetFile)
  )
}
