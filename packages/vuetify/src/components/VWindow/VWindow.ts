// Styles
import './VWindow.sass'

// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

// Directives
import Touch from '../../directives/touch'

// Types
import { VNode, VNodeDirective } from 'vue/types/vnode'

/* @vue/component */
export default BaseItemGroup.extend({
  name: 'v-window',

  provide (): object {
    return {
      windowGroup: this,
    }
  },

  directives: { Touch },

  props: {
    activeClass: {
      type: String,
      default: 'v-window-item--active',
    },
    continuous: Boolean,
    mandatory: {
      type: Boolean,
      default: true,
    },
    nextIcon: {
      type: [Boolean, String],
      default: '$next',
    },
    prevIcon: {
      type: [Boolean, String],
      default: '$prev',
    },
    reverse: {
      type: Boolean,
      default: undefined,
    },
    showArrows: Boolean,
    showArrowsOnHover: Boolean,
    touch: Object,
    touchless: Boolean,
    value: {
      required: false,
    },
    vertical: Boolean,
  },

  data () {
    return {
      changedByDelimiters: false,
      internalHeight: undefined as undefined | string, // This can be fixed by child class.
      transitionHeight: undefined as undefined | string, // Intermediate height during transition.
      transitionCount: 0, // Number of windows in transition state.
      isBooted: false,
      isReverse: false,
    }
  },

  computed: {
    isActive (): boolean {
      return this.transitionCount > 0
    },
    classes (): object {
      return {
        ...BaseItemGroup.options.computed.classes.call(this),
        'v-window--show-arrows-on-hover': this.showArrowsOnHover,
      }
    },
    computedTransition (): string {
      if (!this.isBooted) return ''

      const axis = this.vertical ? 'y' : 'x'
      const direction = this.internalReverse ? '-reverse' : ''

      return `v-window-${axis}${direction}-transition`
    },
    hasActiveItems (): boolean {
      return Boolean(
        this.items.find(item => !item.disabled)
      )
    },
    hasNext (): boolean {
      return this.continuous || this.internalIndex < this.items.length - 1
    },
    hasPrev (): boolean {
      return this.continuous || this.internalIndex > 0
    },
    internalIndex (): number {
      return this.items.findIndex((item, i) => {
        return this.internalValue === this.getValue(item, i)
      })
    },
    internalReverse (): boolean {
      if (this.reverse !== undefined) return this.reverse

      return this.isReverse
    },
  },

  watch: {
    internalIndex: 'updateReverse',
  },

  mounted () {
    window.requestAnimationFrame(() => (this.isBooted = true))
  },

  methods: {
    genContainer (): VNode {
      const children = [this.$slots.default]

      if (this.showArrows) {
        children.push(this.genControlIcons())
      }

      return this.$createElement('div', {
        staticClass: 'v-window__container',
        class: {
          'v-window__container--is-active': this.isActive,
        },
        style: {
          height: this.internalHeight || this.transitionHeight,
        },
      }, children)
    },
    genIcon (
      direction: 'prev' | 'next',
      icon: string,
      fn: () => void
    ) {
      return this.$createElement('div', {
        staticClass: `v-window__${direction}`,
      }, [
        this.$createElement(VBtn, {
          props: { icon: true },
          attrs: {
            'aria-label': this.$vuetify.lang.t(`$vuetify.carousel.${direction}`),
          },
          on: {
            click: () => {
              this.changedByDelimiters = true
              fn()
            },
          },
        }, [
          this.$createElement(VIcon, {
            props: { large: true },
          }, icon),
        ]),
      ])
    },
    genControlIcons () {
      const icons = []

      const prevIcon = this.$vuetify.rtl
        ? this.nextIcon
        : this.prevIcon

      /* istanbul ignore else */
      if (
        this.hasPrev &&
        prevIcon &&
        typeof prevIcon === 'string'
      ) {
        const icon = this.genIcon('prev', prevIcon, this.prev)
        icon && icons.push(icon)
      }

      const nextIcon = this.$vuetify.rtl
        ? this.prevIcon
        : this.nextIcon

      /* istanbul ignore else */
      if (
        this.hasNext &&
        nextIcon &&
        typeof nextIcon === 'string'
      ) {
        const icon = this.genIcon('next', nextIcon, this.next)
        icon && icons.push(icon)
      }

      return icons
    },
    getNextIndex (index: number): number {
      const nextIndex = (index + 1) % this.items.length
      const item = this.items[nextIndex]

      if (item.disabled) return this.getNextIndex(nextIndex)

      return nextIndex
    },
    getPrevIndex (index: number): number {
      const prevIndex = (index + this.items.length - 1) % this.items.length
      const item = this.items[prevIndex]

      if (item.disabled) return this.getPrevIndex(prevIndex)

      return prevIndex
    },
    next () {
      this.isReverse = this.$vuetify.rtl

      /* istanbul ignore if */
      if (!this.hasActiveItems || !this.hasNext) return

      const nextIndex = this.getNextIndex(this.internalIndex)
      const item = this.items[nextIndex]

      this.internalValue = this.getValue(item, nextIndex)
    },
    prev () {
      this.isReverse = !this.$vuetify.rtl

      /* istanbul ignore if */
      if (!this.hasActiveItems || !this.hasPrev) return

      const lastIndex = this.getPrevIndex(this.internalIndex)
      const item = this.items[lastIndex]

      this.internalValue = this.getValue(item, lastIndex)
    },
    updateReverse (val: number, oldVal: number) {
      if (this.changedByDelimiters) {
        this.changedByDelimiters = false
        return
      }

      this.isReverse = val < oldVal
    },
  },

  render (h): VNode {
    const data = {
      staticClass: 'v-window',
      class: this.classes,
      directives: [] as VNodeDirective[],
    }

    if (!this.touchless) {
      const value = this.touch || {
        left: () => {
          this.$vuetify.rtl ? this.prev() : this.next()
        },
        right: () => {
          this.$vuetify.rtl ? this.next() : this.prev()
        },
        end: (e: TouchEvent) => {
          e.stopPropagation()
        },
        start: (e: TouchEvent) => {
          e.stopPropagation()
        },
      }

      data.directives.push({
        name: 'touch',
        value,
      })
    }

    return h('div', data, [this.genContainer()])
  },
})
