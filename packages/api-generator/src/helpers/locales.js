const fs = require('fs')

function getLocaleData () {
  const localeData = {}
  const localeFolders = fs.readdirSync('./src/locale')
  localeFolders.forEach(folder => {
    const locale = {}
    const localeFiles = fs.readdirSync(`./src/locale/${folder}`)
    localeFiles.forEach(file => {
      const compLocale = fs.readFileSync(`./src/locale/${folder}/${file}`, 'utf8')
      locale[file.split('.')[0]] = JSON.parse(compLocale)
    })
    localeData[folder] = locale
  })
  return localeData
}

module.exports = getLocaleData()
