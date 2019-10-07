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
    subheaderHeight: 0,
  }),

  computed: {
    computedElevation (): string | number | undefined {
      return this.flat ? undefined : this.elevation
    },
    frontShift (): number {
      return this.isActive ? this.activeHeight : this.collapsedHeight
    },
  },

  mounted () {
    this.measureBack()
    this.measureSubheader()
  },

  methods: {
    measureBack () {
      if (this.isActive) {
        this.activeHeight = (this.$refs.back as Vue).$el.getBoundingClientRect().height
      } else {
        this.collapsedHeight = (this.$refs.back as Vue).$el.getBoundingClientRect().height
      }
    },
    measureSubheader () {
      this.subheaderHeight = (this.$refs.subheader as Element).getBoundingClientRect().height
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
          value: this.measureBack,
        }],
        style: {
          'max-height': `calc(100vh - ${this.subheaderHeight}px)`,
        },
      }, [
        this.isActive ? this.$slots.back : this.$slots.collapsed,
      ]),
      this.$createElement(VSheet, {
        staticClass: 'v-backdrop__front',
        class: this.elevationClasses,
        style: {
          transform: `translateY(${this.frontShift}px)`,
        },
      }, [
        this.$createElement('div', {
          staticClass: 'v-backdrop__subheader',
          ref: 'subheader',
          directives: [{
            name: 'mutate',
            value: this.measureSubheader,
          }],
        }, [
          this.$slots.subheader,
        ]),
        this.$createElement('div', {
          staticClass: 'v-backdrop__content',
          style: {
            'max-height': `calc(100vh - ${this.frontShift + this.subheaderHeight}px)`,
          },
        }, [
          this.$slots.default,
        ]),
      ]),
    ])
  },
})
