import { factory as PositionableFactory } from './positionable'

export default function applicationable (value, events = []) {
  return {
    name: 'applicationable',

    mixins: [PositionableFactory(['absolute', 'fixed'])],

    props: {
      app: Boolean
    },

    computed: {
      applicationProperty () {
        return value
      }
    },

    watch: {
      // If previous value was app
      // reset the provided prop
      app (x, prev) {
        prev
          ? this.removeApplication(true)
          : this.callUpdate()
      }
    },

    activated () {
      this.callUpdate()
    },

    created () {
      for (let i = 0, length = events.length; i < length; i++) {
        this.$watch(events[i], this.callUpdate)
      }
      this.callUpdate()
    },

    mounted () {
      this.callUpdate()
    },

    deactivated () {
      this.removeApplication()
    },

    destroyed () {
      this.removeApplication()
    },

    methods: {
      callUpdate () {
        if (!this.app) return

        this.$vuetify.application.bind(
          this._uid,
          this.applicationProperty,
          this.updateApplication()
        )
      },
      removeApplication (force) {
        if (!force && !this.app) return

        this.$vuetify.application.unbind(
          this._uid,
          this.applicationProperty
        )
      },
      updateApplication: () => {}
    }
  }
}
