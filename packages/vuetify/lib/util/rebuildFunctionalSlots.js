/**
 *
 * @param {object} slots
 * @param {function} h
 * @returns {array}
 */
export default function rebuildFunctionalSlots(slots, h) {
    var children = [];
    for (var slot in slots) {
        if (slots.hasOwnProperty(slot)) {
            children.push(h('template', { slot: slot }, slots[slot]));
        }
    }
    return children;
}
//# sourceMappingURL=rebuildFunctionalSlots.js.map