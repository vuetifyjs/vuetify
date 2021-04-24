// Styles
import './VSnackbar.sass'

// Components
import VSheet from '../VSheet/VSheet'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import Toggleable from '../../mixins/toggleable'
import { factory as PositionableFactory } from '../../mixins/positionable'

// Utilities
import mixins from '../../util/mixins'
import { convertToUnit, getSlot } from '../../util/helpers'
import { deprecate, removed } from '../../util/console'

// Types
import { PropType, VNode } from 'vue'

export default mixins(
  VSheet,
  Colorable,
  Toggleable,
  PositionableFactory([
    'absolute',
    'bottom',
    'left',
    'right',
    'top',
  ])
/* @vue/component */
).extend({
  name: 'v-snackbar',

  props: {
    app: Boolean,
    centered: Boolean,
    contentClass: {
      type: String,
      default: '',
    },
    multiLine: Boolean,
    text: Boolean,
    timeout: {
      type: [Number, String],
      default: 5000,
    },
    transition: {
      type: [Boolean, String] as PropType<false | string>,
      default: 'v-snack-transition',
      validator: v => typeof v === 'string' || v === false,
    },
    vertical: Boolean,
  },

  data: () => ({
    activeTimeout: -1,
  }),

  computed: {
    classes (): object {
      return {
        'v-snack--absolute': this.absolute,
        'v-snack--active': this.isActive,
        'v-snack--bottom': this.bottom || !this.top,
        'v-snack--centered': this.centered,
        'v-snack--has-background': this.hasBackground,
        'v-snack--left': this.left,
        'v-snack--multi-line': this.multiLine && !this.vertical,
        'v-snack--right': this.right,
        'v-snack--text': this.text,
        'v-snack--top': this.top,
        'v-snack--vertical': this.vertical,
      }
    },
    // Text and outlined styles both
    // use transparent backgrounds
    hasBackground (): boolean {
      return (
        !this.text &&
        !this.outlined
      )
    },
    // Snackbar is dark by default
    // override themeable logic.
    isDark (): boolean {
      return this.hasBackground
        ? !this.light
        : Themeable.options.computed.isDark.call(this)
    },
    styles (): object {
      // Styles are not needed when
      // using the absolute prop.
      if (this.absolute) return {}

      const {
        bar,
        bottom,
        footer,
        insetFooter,
        left,
        right,
        top,
      } = this.$vuetify.application

      // Should always move for y-axis
      // applicationable components.
      return {
        paddingBottom: convertToUnit(bottom + footer + insetFooter),
        paddingLeft: !this.app ? undefined : convertToUnit(left),
        paddingRight: !this.app ? undefined : convertToUnit(right),
        paddingTop: convertToUnit(bar + top),
      }
    },
  },

  watch: {
    isActive: 'setTimeout',
    timeout: 'setTimeout',
  },

  mounted () {
    if (this.isActive) this.setTimeout()
  },

  created () {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('auto-height')) {
      removed('auto-height', this)
    }

    /* istanbul ignore next */
    // eslint-disable-next-line eqeqeq
    if (this.timeout == 0) {
      deprecate('timeout="0"', '-1', this)
    }
  },

  methods: {
    genActions () {
      return this.$createElement('div', {
        staticClass: 'v-snack__action ',
      }, [
        getSlot(this, 'action', {
          attrs: { class: 'v-snack__btn' },
        }),
      ])
    },
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-snack__content',
        class: {
          [this.contentClass]: true,
        },
        attrs: {
          role: 'status',
          'aria-live': 'polite',
        },
      }, [getSlot(this)])
    },
    genWrapper () {
      const setColor = this.hasBackground
        ? this.setBackgroundColor
        : this.setTextColor

      const data = setColor(this.color, {
        staticClass: 'v-snack__wrapper',
        class: VSheet.options.computed.classes.call(this),
        style: VSheet.options.computed.styles.call(this),
        directives: [{
          name: 'show',
          value: this.isActive,
        }],
        on: {
          mouseenter: () => window.clearTimeout(this.activeTimeout),
          mouseleave: this.setTimeout,
        },
      })

      return this.$createElement('div', data, [
        this.genContent(),
        this.genActions(),
      ])
    },
    genTransition () {
      return this.$createElement('transition', {
        props: { name: this.transition },
      }, [this.genWrapper()])
    },
    setTimeout () {
      window.clearTimeout(this.activeTimeout)

      const timeout = Number(this.timeout)

      if (
        !this.isActive ||
        // TODO: remove 0 in v3
        [0, -1].includes(timeout)
      ) {
        return
      }

      this.activeTimeout = window.setTimeout(() => {
        this.isActive = false
      }, timeout)
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-snack',
      class: this.classes,
      style: this.styles,
    }, [
      this.transition !== false
        ? this.genTransition()
        : this.genWrapper(),
    ])
  },
})
