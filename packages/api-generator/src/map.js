const fs = require('fs')

// get datatable data
const vData = require('./js/v-data')
const vDataTable = require('./js/v-data-table')
const vDataIterator = require('./js/v-data-iterator')

// general asyc function
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// compile map data from json
const getMapData = async () => {
  const dir = 'src/maps'
  let maps = {}
  await asyncForEach(fs.readdirSync(dir), async mapFile => {
    const compMap = await JSON.parse(
      fs.readFileSync(`${dir}/${mapFile}`, 'utf-8')
    )
    maps = Object.assign(maps, compMap)
  })
  return maps
}

module.exports = {
  'v-data': vData,
  'v-data-table': vDataTable,
  'v-data-iterator': vDataIterator,
  ...getMapData()
}
