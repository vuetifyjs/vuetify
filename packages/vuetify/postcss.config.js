const autoprefixer = require('autoprefixer')

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
      remove: false
    }),
    vuetifyDirection,
  ]
})
