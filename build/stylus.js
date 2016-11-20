const stylus = require('stylus')
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

let styles = fs.readFileSync(resolve('../src/stylus/main.styl'), 'utf8')

stylus(styles)
  .include(resolve('../src/stylus'))
  .set('compress', true)
  .render((err, css) => {
    fs.writeFileSync(resolve('../dist/vuetify.min.css'), css)
  })