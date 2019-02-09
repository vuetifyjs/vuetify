// Components
import {
  VTabTransition,
  VTabReverseTransition
} from '../transitions'

// Mixins
import { Registrable, inject as RegistrableInject } from '../../mixins/registrable'

// Helpers
import { convertToUnit } from '../../util/helpers'

// Util
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue, { VNode, FunctionalComponentOptions, VNodeData } from 'vue'

interface options extends Vue {
  $refs: {
    wrapper: HTMLElement
  }
  isVerticalProvided: boolean
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    Registrable<'stepper'>
  ]>
/* eslint-enable indent */
>(
  RegistrableInject('stepper', 'v-stepper-content', 'v-stepper')
/* @vue/component */
).extend({
  name: 'v-stepper-content',

  inject: {
    isVerticalProvided: {
      from: 'isVertical'
    }
  },

  props: {
    step: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      height: 0 as number | string,
      // Must be null to allow
      // previous comparison
      isActive: null as boolean | null,
      isReverse: false,
      isVertical: this.isVerticalProvided
    }
  },

  computed: {
    classes (): object {
      return {
        'v-stepper__content': true
      }
    },
    computedTransition (): FunctionalComponentOptions {
      return this.isReverse
        ? VTabReverseTransition
        : VTabTransition
    },
    styles (): object {
      if (!this.isVertical) return {}

      return {
        height: convertToUnit(this.height)
      }
    },
    wrapperClasses (): object {
      return {
        'v-stepper__wrapper': true
      }
    }
  },

  watch: {
    isActive (current, previous) {
      // If active and the previous state
      // was null, is just booting up
      if (current && previous == null) {
        this.height = 'auto'
        return
      }

      if (!this.isVertical) return

      if (this.isActive) this.enter()
      else this.leave()
    }
  },

  mounted () {
    this.$refs.wrapper.addEventListener(
      'transitionend',
      this.onTransition,
      false
    )
    this.stepper && this.stepper.register(this)
  },

  beforeDestroy () {
    this.$refs.wrapper.removeEventListener(
      'transitionend',
      this.onTransition,
      false
    )
    this.stepper && this.stepper.unregister(this)
  },

  methods: {
    onTransition (e: TransitionEvent) {
      if (!this.isActive ||
        e.propertyName !== 'height'
      ) return

      this.height = 'auto'
    },
    enter () {
      let scrollHeight = 0

      // Render bug with height
      requestAnimationFrame(() => {
        scrollHeight = this.$refs.wrapper.scrollHeight
      })

      this.height = 0

      // Give the collapsing element time to collapse
      setTimeout(() => this.isActive && (this.height = (scrollHeight || 'auto')), 450)
    },
    leave () {
      this.height = this.$refs.wrapper.clientHeight
      setTimeout(() => (this.height = 0), 10)
    },
    toggle (step: string | number, reverse: boolean) {
      this.isActive = step.toString() === this.step.toString()
      this.isReverse = reverse
    }
  },

  render (h): VNode {
    const contentData: VNodeData = {
      'class': this.classes
    }
    const wrapperData = {
      'class': this.wrapperClasses,
      style: this.styles,
      ref: 'wrapper'
    }

    if (!this.isVertical) {
      contentData.directives = [{
        name: 'show',
        value: this.isActive
      }]
    }

    const wrapper = h('div', wrapperData, [this.$slots.default])
    const content = h('div', contentData, [wrapper])

    return h(this.computedTransition, {
      on: this.$listeners
    }, [content])
  }
})
