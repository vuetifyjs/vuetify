const fs = require('fs')
const { kebabCase } = require('lodash')

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

const processAPIFolder = async dirPath => {
  let comps = {}
  await asyncForEach(fs.readdirSync(dirPath), async compFile => {
    const compName = compFile.split('.')[0]
    const compMap = await JSON.parse(
      fs.readFileSync(`${dirPath}/${compFile}`, 'utf-8')
    )
    comps = Object.assign(comps, { [compName]: compMap })
  })
  return comps
}

const compileAPIOutput = async groups => {
  let retData = {}
  await asyncForEach(Object.keys(groups), async group => {
    const groupDetails = groups[group]
    if (group === 'inherited') {
      retData = Object.assign(retData, { [group]: groupDetails })
    } else {
      var items = []
      await asyncForEach(Object.keys(groupDetails), async item => {
        const itemDetails = groupDetails[item]
        items.push({ name: item, ...itemDetails, desc: '' })
      })
      retData = Object.assign(retData, { [group]: items })
    }
  })
  return retData
}

const init = async () => {
  // set variables
  const dataDir = 'src/data'
  const folders = fs.readdirSync('src/data', 'utf-8')
  let apiData = {}
  let compData = {}

  // collect langs and component maps from files
  await asyncForEach(folders, async folder => {
    const comps = await processAPIFolder(`${dataDir}/${folder}`)
    compData = Object.assign(compData, comps)
  })

  // process component descriptions
  await asyncForEach(Object.keys(compData), async comp => {
    const apiComp = await compileAPIOutput(compData[comp])
    // may want to do a type conversion here from Alert -> v-alert
    apiData = Object.assign(apiData, { [kebabCase(comp)]: apiComp })
  })

  // ensure folder exists and write api file
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', 0o755)
  }
  writeApiFile(apiData, 'dist/api.js')
}

init()
