'use strict'
const shell = require('shelljs')

shell.mkdir('-p', 'dist/json')
shell.cd('../api-generator')
shell.exec('yarn build')
shell.mv('dist/tags.json', '../vuetify/dist/json')
shell.mv('dist/attributes.json', '../vuetify/dist/json')
shell.mv('dist/web-types.json', '../vuetify/dist/json')
