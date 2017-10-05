export function factory (opts = { closeDependents: true }) {
  return {
    props: {
      closeDependents: {
        type: Boolean,
        default: opts.closeDependents
      },
      isDependent: {
        type: Boolean,
        default: opts.isDependent
      }
    },

    methods: {
      getCloseableDependents () {
        const results = []
        if (this.closeDependents) {
          const search = (children) => {
            for (const child of children) {
              if (child.isActive && (child.isDependent || (child.closeDependents && child.isDependent !== false))) {
                results.push(child)
              } else {
                search(child.$children)
              }
            }
          }
          search(this.$children)
        }
        return results
      }
    },

    watch: {
      isActive (val, oldVal) {
        if (!val && val !== oldVal) {
          for (const dependent of this.getCloseableDependents()) {
            dependent.isActive = false
          }
        }
      }
    }
  }
}

const Dependent = factory()

export default Dependent
