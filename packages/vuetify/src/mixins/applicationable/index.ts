import { factory as PositionableFactory } from '../positionable'
import { TargetProp } from 'vuetify/types/services/application'

// Util
import mixins from '../../util/mixins'

export default function applicationable (value: TargetProp, events: string[] = []) {
  /* @vue/component */
  return mixins(PositionableFactory(['absolute', 'fixed'])).extend({
    name: 'applicationable',

    props: {
      app: Boolean,
    },

    computed: {
      applicationProperty (): TargetProp {
        return value
      },
    },

    watch: {
      // If previous value was app
      // reset the provided prop
      app (x: boolean, prev: boolean) {
        prev
          ? this.removeApplication(true)
          : this.callUpdate()
      },
      applicationProperty (newVal, oldVal) {
        this.$vuetify.application.unregister(this._uid, oldVal)
      },
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

        this.$vuetify.application.register(
          this._uid,
          this.applicationProperty,
          this.updateApplication()
        )
      },
      removeApplication (force = false) {
        if (!force && !this.app) return

        this.$vuetify.application.unregister(
          this._uid,
          this.applicationProperty
        )
      },
      updateApplication: () => 0,
    },
  })
}
