/**
 *
 * @param {object} slots
 * @param {function} h
 * @returns {array}
 */
export default function rebuildFunctionalSlots(slots, h) {
    const children = [];
    for (const slot in slots) {
        if (slots.hasOwnProperty(slot)) {
            children.push(h('template', { slot }, slots[slot]));
        }
    }
    return children;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVidWlsZEZ1bmN0aW9uYWxTbG90cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3JlYnVpbGRGdW5jdGlvbmFsU2xvdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLHNCQUFzQixDQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3RELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQTtJQUVuQixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtRQUN4QixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNwRDtLQUNGO0lBRUQsT0FBTyxRQUFRLENBQUE7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBzbG90c1xuICogQHBhcmFtIHtmdW5jdGlvbn0gaFxuICogQHJldHVybnMge2FycmF5fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWJ1aWxkRnVuY3Rpb25hbFNsb3RzIChzbG90cywgaCkge1xuICBjb25zdCBjaGlsZHJlbiA9IFtdXG5cbiAgZm9yIChjb25zdCBzbG90IGluIHNsb3RzKSB7XG4gICAgaWYgKHNsb3RzLmhhc093blByb3BlcnR5KHNsb3QpKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKGgoJ3RlbXBsYXRlJywgeyBzbG90IH0sIHNsb3RzW3Nsb3RdKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2hpbGRyZW5cbn1cbiJdfQ==