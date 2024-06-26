// Components
import {
  VTabTransition,
  VTabReverseTransition,
} from '../transitions'

// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable'

// Helpers
import { convertToUnit, getSlot } from '../../util/helpers'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode, FunctionalComponentOptions, VNodeData } from 'vue'

const baseMixins = mixins(
  RegistrableInject('stepper', 'v-stepper-content', 'v-stepper')
)

interface options extends InstanceType<typeof baseMixins> {
  $refs: {
    wrapper: HTMLElement
  }
  isVerticalProvided: boolean
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-stepper-content',

  inject: {
    isVerticalProvided: {
      from: 'isVertical',
    },
  },

  props: {
    step: {
      type: [Number, String],
      required: true,
    },
  },

  data () {
    return {
      height: 0 as number | string,
      // Must be null to allow
      // previous comparison
      isActive: null as boolean | null,
      isReverse: false,
      isVertical: this.isVerticalProvided,
    }
  },

  computed: {
    computedTransition (): FunctionalComponentOptions {
      // Fix for #8978
      const reverse = this.$vuetify.rtl ? !this.isReverse : this.isReverse

      return reverse
        ? VTabReverseTransition
        : VTabTransition
    },
    styles (): object {
      if (!this.isVertical) return {}

      return {
        height: convertToUnit(this.height),
      }
    },
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
    },
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
    },
  },

  render (h): VNode {
    const contentData = {
      staticClass: 'v-stepper__content',
    } as VNodeData
    const wrapperData = {
      staticClass: 'v-stepper__wrapper',
      style: this.styles,
      ref: 'wrapper',
    }

    if (!this.isVertical) {
      contentData.directives = [{
        name: 'show',
        value: this.isActive,
      }]
    }

    const wrapper = h('div', wrapperData, getSlot(this))
    const content = h('div', contentData, [wrapper])

    return h(this.computedTransition, {
      on: this.$listeners,
    }, [content])
  },
})
