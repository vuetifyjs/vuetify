import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

const requireLang = require.context(
  './',
  true,
  /\.json$/
)

const messages = {}

for (const file of requireLang.keys()) {
  if (file === './index.js') continue

  const path = file.replace(/(\.\/|\.json$)/g, '').split('/')

  path.reduce((o, s, i) => {
    const prop = i !== 0
      ? upperFirst(camelCase(s))
      : s

    o[prop] = i + 1 === path.length
      ? requireLang(file)
      : o[prop] || {}

    return o[prop]
  }, messages)
}

export default messages
