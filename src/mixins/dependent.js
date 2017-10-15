function searchChildren (children) {
  const results = []
  for (const child of children) {
    if (child.isActive && child.isDependent) {
      results.push(child)
    } else {
      results.push(...searchChildren(child.$children))
    }
  }

  return results
}

export default {
  data () {
    return {
      closeDependents: true,
      isDependent: true
    }
  },

  methods: {
    getOpenDependents () {
      if (this.closeDependents) return searchChildren(this.$children)

      return []
    },
    getOpenDependentElements () {
      const result = []

      for (const dependent of this.getOpenDependents()) {
        result.push(...dependent.getClickableDependentElements())
      }

      return result
    },
    getClickableDependentElements () {
      const result = [this.$el]
      if (this.$refs.content) result.push(this.$refs.content)
      result.push(...this.getOpenDependentElements())

      return result
    }
  },

  watch: {
    isActive (val) {
      if (val) return

      for (const dependent of this.getOpenDependents()) {
        dependent.isActive = false
      }
    }
  }
}
