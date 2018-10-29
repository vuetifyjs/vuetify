/**
 *
 * @param {object} slots
 * @param {function} h
 * @returns {array}
 */
export default function rebuildFunctionalSlots (slots, h) {
  const children = []

  for (const slot in slots) {
    if (slots.hasOwnProperty(slot)) {
      children.push(h('template', { slot }, slots[slot]))
    }
  }

  return children
}
