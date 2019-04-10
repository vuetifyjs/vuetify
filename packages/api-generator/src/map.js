const fs = require('fs')

// general asyc function
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// compile map data from json
const getMapData = async () => {
  let maps = {}
  await asyncForEach(fs.readdirSync('./src/maps'), async mapFile => {
    const compMap = require(`./maps/${mapFile}`)
    maps = Object.assign(maps, compMap)
  })
  return maps
}

module.exports = {
  ...getMapData()
}
