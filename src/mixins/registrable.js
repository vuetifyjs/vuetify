function generateWarning (child, parent) {
  return () => console.warn(`[Vuetify] Warn: The ${child} component must be used inside a ${parent}.`)
}

export function inject (child, parent) {
  return {
    inject: {
      register: {
        default: () => generateWarning(child, parent)
      },
      unregister: {
        default: () => generateWarning(child, parent)
      }
    }
  }
}

export const provide = {
  methods: {
    register: null,
    unregister: null
  },
  provide () {
    return {
      register: this.register,
      unregister: this.unregister
    }
  }
}
