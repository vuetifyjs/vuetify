module.exports = dir => {
  if (!dir) return css => css

  const removeDirectionSelector = selector => selector.replace(`.application--is-${dir} `, '')
  const directionMatchFilter = selector => !selector.startsWith(`.application--is-${dir === 'rtl' ? 'ltr' : 'rtl'}`)

  return css => css.walkRules(rule => {
    const selectors = rule.selectors.filter(directionMatchFilter).map(removeDirectionSelector)

    if (selectors.length) {
      rule.selectors = selectors
    } else {
      rule.remove()
    }
  })
}
