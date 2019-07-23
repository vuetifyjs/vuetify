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
    const hasSlots = mapExists && !!maps[slot].slots
    const hasDefaultSlot = hasSlots && maps[slot].slots.find(s => s.name === 'default')
    const slotDefault = { name: 'default', props: undefined }
    if (!mapExists) {
      maps[slot] = { slots: [slotDefault] }
    } else if (!hasSlots) {
      maps[slot].slots = [slotDefault]
    } else if (!hasDefaultSlot) {
      maps[slot].slots.push(slotDefault)
    }
  })
  return maps
}

module.exports = getMapData()
