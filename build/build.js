const cssnano = require('cssnano')
const postcss = require('postcss')
const terser = require('terser')
const fs = require('fs')

const target = process.env.TARGET || 'production'

function minifyCss () {
  fs.readFile('../dist/vuetify.css', (err, css) => {
    if (err) return console.error(err.message)
    postcss([cssnano])
      .process(css, { from: 'dist/vuetify.css', to: 'dist/vuetify.min.css' })
      .then(result => {
        fs.writeFile('../dist.vuetify.min.css', result.css, () => true)
      })
  })
}

function minifyJs () {
  fs.readFile('../dist.vuetify.js', (err, css) => {
    ///
  })
}
