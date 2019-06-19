const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')

const dir = process.env.VUETIFY_DIRECTION;
const vuetifyDirection = dir ? (css => css.walkRules(rule => {
  const selectors = rule.selectors.filter(selector => {
    return !selector.startsWith(`.application--is-${dir === 'rtl' ? 'ltr' : 'rtl'}`)
  }).map(selector => selector.replace(`.application--is-${dir} `, ''))

  if(selectors.length) {
    rule.selectors = selectors
  } else {
    rule.remove()
  }
})) : (css => css)

module.exports = ctx => ({
  plugins: [
    autoprefixer({
      browsers: ['>0.5%', 'last 2 versions', 'not dead', 'not op_mini all'],
      remove: false
    }),
    mqpacker(),
    vuetifyDirection,
  ]
})
