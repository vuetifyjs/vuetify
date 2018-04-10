export default {
  props: {
    valueComparator: {
      type: Function,
      default: (a, b) => {
        if (a !== Object(a)) return a === b
        const aProps = Object.keys(a)
        const bProps = Object.keys(b)

        return aProps.length === bProps.length &&
          aProps.every(propName => a[propName] === b[propName])
      }
    }
  }
}
