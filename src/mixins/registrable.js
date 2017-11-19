function generateWarning (child, parent) {
  return () => console.warn(`[Vuetify] Warn: The ${child} component must be used inside a ${parent}.`)
}

export function inject (namespace, child, parent) {
  return {
    inject: {
      [namespace]: {
        default: {
          register: generateWarning(child, parent),
          unregister: generateWarning(child, parent)
        }
      }
    }
  }
}

export function provide (namespace) {
  return {
    methods: {
      register: null,
      unregister: null
    },
    provide () {
      return {
        [namespace]: {
          register: this.register,
          unregister: this.unregister
        }
      }
    }
  }
}
