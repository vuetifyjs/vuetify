import '../../stylus/components/_selection-controls.styl'
import '../../stylus/components/_switch.styl'

// Mixins
import Selectable from '../../mixins/selectable'

// Directives
import Touch from '../../directives/touch'

// Components
import { VFabTransition } from '../transitions'
import VProgressCircular from '../VProgressCircular/VProgressCircular'

/* @vue/component */
export default {
  name: 'v-switch',

  directives: { Touch },

  mixins: [
    Selectable
  ],

  props: {
    loading: {
      type: [Boolean, String],
      default: false
    }
  },

  computed: {
    classes () {
      return {
        'v-input--selection-controls v-input--switch': true
      }
    },
    switchClasses () {
      return {
        ...(this.loading ? undefined : this.classesSelectable),
        ...this.themeClasses
      }
    }
  },

  methods: {
    genDefaultSlot () {
      return [
        this.genSwitch(),
        this.genLabel()
      ]
    },
    genSwitch () {
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input'
      }, [
        this.genInput('checkbox', this.$attrs),
        !this.disabled && this.genRipple({
          'class': this.classesSelectable,
          directives: [{
            name: 'touch',
            value: {
              left: this.onSwipeLeft,
              right: this.onSwipeRight
            }
          }]
        }),
        this.$createElement('div', {
          staticClass: 'v-input--switch__track',
          class: this.switchClasses
        }),
        this.$createElement('div', {
          staticClass: 'v-input--switch__thumb',
          class: this.switchClasses
        }, [this.genProgress()])
      ])
    },
    genProgress () {
      return this.$createElement(VFabTransition, {}, [
        this.loading === false
          ? null
          : this.$slots.progress || this.$createElement(VProgressCircular, {
            props: {
              color: (this.loading === true || this.loading === '')
                ? (this.color || 'primary')
                : this.loading,
              size: 16,
              width: 2,
              indeterminate: true
            }
          })
      ])
    },
    onSwipeLeft () {
      if (this.isActive) this.onChange()
    },
    onSwipeRight () {
      if (!this.isActive) this.onChange()
    }
  }
}
