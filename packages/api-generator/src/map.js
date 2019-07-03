const fs = require('fs')

function getMapData () {
  let maps = {}
  const mapFiles = fs.readdirSync('./src/maps')
  mapFiles.forEach(mapFile => {
    const compMap = require(`./maps/${mapFile}`)
    maps = Object.assign(maps, compMap)
  })
  return maps
}

module.exports = getMapData()
