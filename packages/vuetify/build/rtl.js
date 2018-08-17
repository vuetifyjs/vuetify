const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const postcssrtl = require('postcss-rtl')

function getPath (filename) {
  return path.join(__dirname, '../dist', filename)
}
function outputPath (path, direction) {
  if (!direction) return path
  return path.replace(/(\.min)?\.css$/, `.${direction}$&`)
}

const addIgnoreComments = postcss.plugin('add-ignore-comments', () => root => {
  root.prepend('/*rtl:begin:ignore*/')
  root.append('/*rtl:end:ignore*/')
})

const files = {
  'vuetify.css': {
    css: fs.readFileSync(getPath('vuetify.css'), 'utf8'),
    map: fs.readFileSync(getPath('vuetify.css.map'), 'utf8')
  },
  'vuetify.min.css': {
    css: fs.readFileSync(getPath('vuetify.min.css'), 'utf8'),
    map: false
  }
}

function runPostcss (filename, direction) {
  const src = getPath(filename)
  const { css, map } = files[filename]
  const dst = outputPath(src, direction)
  const options = direction === 'bidi' ? undefined : { onlyDirection: direction }
  const plugins = direction ? [postcssrtl(options)] : []
  plugins.push(addIgnoreComments())
  return postcss(plugins)
    .process(css, { from: src, to: dst, map: map && { prev: map } })
    .then(({ css, map }) => {
      fs.writeFile(dst, css, err => {
        if (err) throw err
      })
      if (map) {
        fs.writeFile(`${dst}.map`, map, err => {
          if (err) throw err
        })
      }
    })
}

for (const filename of ['vuetify.css', 'vuetify.min.css']) {
  for (const direction of ['bidi', 'rtl', undefined]) {
    runPostcss(filename, direction)
  }
}
