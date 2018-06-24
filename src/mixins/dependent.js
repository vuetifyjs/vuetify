function searchChildren (children) {
  const results = []
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.isActive && child.isDependent) {
      results.push(child)
    } else {
      results.push(...searchChildren(child.$children))
    }
  }

  return results
}

/* @vue/component */
export default {
  name: 'dependent',

  data () {
    return {
      closeDependents: true,
      isDependent: true
    }
  },

  watch: {
    isActive (val) {
      if (val) return

      const openDependents = this.getOpenDependents()
      for (let index = 0; index < openDependents.length; index++) {
        openDependents[index].isActive = false
      }
    }
  },

  methods: {
    getOpenDependents () {
      if (this.closeDependents) return searchChildren(this.$children)

      return []
    },
    getOpenDependentElements () {
      const result = []
      const openDependents = this.getOpenDependents()

      for (let index = 0; index < openDependents.length; index++) {
        result.push(...openDependents[index].getClickableDependentElements())
      }

      return result
    },
    getClickableDependentElements () {
      const result = [this.$el]
      if (this.$refs.content) result.push(this.$refs.content)
      result.push(...this.getOpenDependentElements())

      return result
    }
  }
}
