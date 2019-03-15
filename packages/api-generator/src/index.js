const fs = require('fs')

// components['$vuetify'] = map['$vuetify']
// components['internationalization'] = map['internationalization']

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const writeApiFile = (obj, file) => {
  const stream = fs.createWriteStream(file)
  const comment = `// THIS FILE HAS BEEN AUTOMATICALLY GENERATED USING THE API-GENERATOR TOOL.
// CHANGES MADE TO THIS FILE WILL BE LOST!

`
  stream.once('open', () => {
    stream.write(comment)
    stream.write('module.exports = ')
    stream.write(JSON.stringify(obj, null, 2))
    stream.end()
  })
}

const parseLangDir = async path => {
  let retData = {}
  await asyncForEach(fs.readdirSync(path), async file => {
    const filename = file.split('.')[0]
    const fileData = await JSON.parse(
      fs.readFileSync(`${path}/${file}`, 'utf-8')
    )
    retData = Object.assign(retData, { [filename]: fileData })
  })
  return retData
}

const processComponentFolder = async rootPath => {
  let comps = {}
  let langs = {}
  await asyncForEach(fs.readdirSync(rootPath), async compName => {
    const compMap = await JSON.parse(
      fs.readFileSync(`${rootPath}/${compName}/${compName}.json`, 'utf-8')
    )
    comps = Object.assign(comps, { [compName]: compMap })
    const compLang = await parseLangDir(`${rootPath}/${compName}/lang`)
    langs = Object.assign(langs, { [compName]: compLang })
  })
  return { comps, langs }
}

const compileOutputData = async (lang, groups, descs) => {
  let retData = {}
  await asyncForEach(Object.keys(groups), async group => {
    const groupDetails = groups[group]
    if (group === 'inherited') {
      retData = Object.assign(retData, { [group]: groupDetails })
    } else {
      var items = []
      await asyncForEach(Object.keys(groupDetails), async item => {
        let desc = ''
        if (descs[lang] && descs[lang][group] && descs[lang][group][item]) {
          desc = descs[lang][group][item]
        }
        if (descs[lang] && descs.en[group] && descs.en[group][item]) {
          desc = descs.en[group][item]
        }
        items.push({ name: item, desc, ...groupDetails[item] })
      })
      retData = Object.assign(retData, { [group]: items })
    }
  })
  return retData
}

const init = async () => {
  // set variables
  const languages = ['en', 'eo-UY', 'ja-JP', 'pt-BR', 'ru-RU', 'zh-CN']
  const folders = ['mixins', 'components']
  let apiData = {}
  let langData = {}
  let compData = {}

  // collect langs and component maps from files
  await asyncForEach(folders, async folder => {
    const { comps, langs } = await processComponentFolder(`src/${folder}`)
    langData = Object.assign(langData, langs)
    compData = Object.assign(compData, comps)
  })

  // process lang file
  await asyncForEach(languages, async lang => {
    let apiLang = {}
    await asyncForEach(Object.keys(compData), async comp => {
      const apiComp = await compileOutputData(lang, compData[comp], langData[comp])
      // may want to do a type conversion here from Alert -> v-alert
      apiLang = Object.assign(apiLang, { [comp]: apiComp })
    })
    apiData = Object.assign(apiData, { [lang]: apiLang })
  })

  // ensure folder exists and write files
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', 0o755)
  }
  writeApiFile(apiData, 'dist/api.js')
  await asyncForEach(Object.keys(apiData), async apiFile => {
    writeApiFile(apiData[apiFile], `dist/${apiFile}.js`)
  })
}

init()
