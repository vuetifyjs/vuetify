const fs = require('fs')
const defaultSlots = require('./default-slots')

function getMapData () {
  let maps = {}
  const mapFiles = fs.readdirSync('./src/maps')
  mapFiles.forEach(mapFile => {
    const compMap = require(`../maps/${mapFile}`)
    maps = Object.assign(maps, compMap)
  })
  defaultSlots.forEach(slot => {
    const mapExists = !!maps[slot]
    const hasSlot = mapExists && !!maps[slot].slots
    const slotDefault = { name: 'default', props: undefined }
    if (!mapExists) {
      maps[slot] = { slots: [slotDefault] }
    } else if (!hasSlot) {
      maps[slot].slots = [slotDefault]
    } else {
      maps[slot].slots.push(slotDefault)
    }
  })
  return maps
}

module.exports = getMapData()
