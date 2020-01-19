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

// Utils
import { convertToUnit } from '../../util/helpers'

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
      default: 1,
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

    window.addEventListener('resize', this.measureBack)
  },

  methods: {
    measureBack () {
      const height = (this.$refs.back as Vue).$el.getBoundingClientRect().height
      if (this.isActive) {
        this.activeHeight = height
      } else {
        this.collapsedHeight = height
      }
    },
    measureSubheader () {
      this.subheaderHeight = (this.$refs.subheader as Element).getBoundingClientRect().height
    },
    genBack () {
      return this.$createElement(VSheet, {
        staticClass: 'v-backdrop__back',
        ref: 'back',
        directives: [{
          name: 'mutate',
          value: this.measureBack,
        }],
        style: {
          'max-height': `calc(100vh - ${convertToUnit(this.subheaderHeight)})`,
        },
      }, this.isActive ? this.$slots.back : this.$slots.collapsed)
    },
    genFront () {
      return this.$createElement(VSheet, {
        staticClass: 'v-backdrop__front',
        class: this.elevationClasses,
        style: {
          transform: `translateY(${convertToUnit(this.frontShift)})`,
        },
        on: {
          click: () => this.isActive = false,
        },
      }, [
        this.$createElement('div', {
          staticClass: 'v-backdrop__subheader',
          ref: 'subheader',
          directives: [{
            name: 'mutate',
            value: this.measureSubheader,
          }],
        }, this.$slots.subheader),
        this.$createElement('div', {
          staticClass: 'v-backdrop__content',
          style: {
            'max-height': `calc(100vh - ${convertToUnit(this.frontShift + this.subheaderHeight)})`,
          },
        }, [this.$slots.default]),
        this.$createElement('div', {
          staticClass: 'v-backdrop__overlay',
          style: {
            height: `calc(100vh - ${convertToUnit(this.frontShift)})`,
          },
        }),
      ])
    },
  },

  render (): VNode {
    return this.$createElement('div', {
      staticClass: 'v-backdrop',
      class: {
        'v-backdrop--active': this.isActive,
      },
    }, [
      this.genBack(),
      this.genFront(),
    ])
  },
})
