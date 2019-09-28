// Styles
import './VBackdrop.sass'

// Mixins
import Elevatable from '../../mixins/elevatable'
import Toggleable from '../../mixins/toggleable'

// Components
import VSheet from '../VSheet'

// Types
import mixins from '../../util/mixins'
import Vue, { VNode } from 'vue'

export default mixins(
  Elevatable,
  Toggleable,
  /* @vue/component */
).extend({
  name: 'v-backdrop',

  props: {
    elevation: {
      type: [Number, String],
      default: 4,
      validator: v => !isNaN(Number(v)),
    },
  },

  data: () => ({
    activeHeight: 0,
    collapsedHeight: 0,
    observer: null as MutationObserver | null,
  }),

  mounted () {
    this.measure()

    this.observer = new MutationObserver(this.measure)

    this.observer.observe((this.$refs.back as Vue).$el, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  },

  beforeDestroy () {
    this.observer && this.observer.disconnect()
  },

  methods: {
    measure () {
      if (this.isActive) {
        this.$nextTick(function () {
          this.activeHeight = (this.$refs.back as Vue).$el.getBoundingClientRect().height
        })
      } else {
        this.$nextTick(function () {
          this.collapsedHeight = (this.$refs.back as Vue).$el.getBoundingClientRect().height
        })
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
