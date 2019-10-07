// Styles
import './VBackdrop.sass'

// Mixins
import Elevatable from '../../mixins/elevatable'
import Toggleable from '../../mixins/toggleable'

// Components
import VSheet from '../VSheet'

// Directives
import { Mutate } from '../../directives/mutate'

// Types
import mixins from '../../util/mixins'
import Vue, { VNode } from 'vue'

export default mixins(
  Elevatable,
  Toggleable,
  /* @vue/component */
).extend({
  name: 'v-backdrop',

  directives: { Mutate },

  props: {
    elevation: {
      type: [Number, String],
      default: 4,
      validator: v => !isNaN(Number(v)),
    },
    flat: Boolean,
  },

  data: () => ({
    activeHeight: 0,
    collapsedHeight: 0,
  }),

  computed: {
    computedElevation (): string | number | undefined {
      return this.flat ? undefined : this.elevation
    },
  },

  mounted () {
    this.measure()
  },

  methods: {
    measure () {
      if (this.isActive) {
        this.activeHeight = (this.$refs.back as Vue).$el.getBoundingClientRect().height
      } else {
        this.collapsedHeight = (this.$refs.back as Vue).$el.getBoundingClientRect().height
      }
    },
  },

  render (): VNode {
    return this.$createElement('div', {
      class: 'v-backdrop',
    }, [
      this.$createElement(VSheet, {
        staticClass: 'v-backdrop__back',
        ref: 'back',
        directives: [{
          name: 'mutate',
          value: this.measure,
        }],
      }, [
        this.isActive ? this.$slots.back : this.$slots.collapsed,
      ]),
      this.$createElement(VSheet, {
        staticClass: 'v-backdrop__front',
        class: this.elevationClasses,
        style: {
          transform: `translateY(${this.isActive ? this.activeHeight : this.collapsedHeight}px)`,
        },
      }, [
        this.$slots.default,
      ]),
    ])
  },
})
