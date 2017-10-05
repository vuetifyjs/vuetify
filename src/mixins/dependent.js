export function factory (opts = { findDependents: true }) {
  return {

    data () {
      return {
        dependents: []
      }
    },

    props: {
      findDependents: {
        type: Boolean,
        default: opts.findDependents
      },
      dependent: {
        type: Boolean,
        default: opts.dependent
      }
    },

    methods: {
      setDependents () {
        const results = []
        if (this.findDependents) {
          const search = (children) => {
            for (const child of children) {
              if (child.dependent || (child.findDependents && child.dependent !== false)) {
                results.push(child)
              } else {
                search(child.$children)
              }
            }
          }
          search(this.$children)
        }

        this.dependents = results
      }
    },

    watch: {
      findDependents (val) {
        this.setDependents()
      },
      isActive (val) {
        if (!val) {
          for (const dependent of this.dependents) {
            if (dependent.isActive) dependent.isActive = false
          }
        }
      }
    },

    mounted () {
      this.$vuetify.load(() => this.setDependents())
    },

    updated () {
      this.setDependents()
    }
  }
}

const Dependent = factory()

export default Dependent
