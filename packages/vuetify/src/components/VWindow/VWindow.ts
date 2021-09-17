// Styles
import './VWindow.sass'

// Types
import { VNode, VNodeDirective } from 'vue/types/vnode'
import { PropType } from 'vue'
import { TouchHandlers } from 'vuetify/types'

// Directives
import Touch from '../../directives/touch'

// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'
import { BaseItemGroup } from '../VItemGroup/VItemGroup'

/* @vue/component */
export default BaseItemGroup.extend({
  name: 'v-window',

  directives: { Touch },

  provide (): object {
    return {
      windowGroup: this,
    }
  },

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
    reverse: Boolean,
    showArrows: Boolean,
    showArrowsOnHover: Boolean,
    touch: Object as PropType<TouchHandlers>,
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
      const reverse = this.internalReverse ? !this.isReverse : this.isReverse
      const direction = reverse ? '-reverse' : ''

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
      return this.$vuetify.rtl ? !this.reverse : this.reverse
    },
  },

  watch: {
    internalIndex (val, oldVal) {
      this.isReverse = this.updateReverse(val, oldVal)
    },
  },

  mounted () {
    window.requestAnimationFrame(() => (this.isBooted = true))
  },

  methods: {
    genDefaultSlot () {
      return this.$slots.default
    },
    genContainer (): VNode {
      const children = [this.genDefaultSlot()]

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
      click: () => void
    ) {
      const on = {
        click: (e: Event) => {
          e.stopPropagation()
          this.changedByDelimiters = true
          click()
        },
      }
      const attrs = {
        'aria-label': this.$vuetify.lang.t(`$vuetify.carousel.${direction}`),
      }
      const children = this.$scopedSlots[direction]?.({
        on,
        attrs,
      }) ?? [this.$createElement(VBtn, {
        props: { icon: true },
        attrs,
        on,
      }, [
        this.$createElement(VIcon, {
          props: { large: true },
        }, icon),
      ])]

      return this.$createElement('div', {
        staticClass: `v-window__${direction}`,
      }, children)
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
      /* istanbul ignore if */
      if (!this.hasActiveItems || !this.hasNext) return

      const nextIndex = this.getNextIndex(this.internalIndex)
      const item = this.items[nextIndex]

      this.internalValue = this.getValue(item, nextIndex)
    },
    prev () {
      /* istanbul ignore if */
      if (!this.hasActiveItems || !this.hasPrev) return

      const lastIndex = this.getPrevIndex(this.internalIndex)
      const item = this.items[lastIndex]

      this.internalValue = this.getValue(item, lastIndex)
    },
    updateReverse (val: number, oldVal: number) {
      const itemsLength = this.items.length
      const lastIndex = itemsLength - 1

      if (itemsLength <= 2) return val < oldVal

      if (val === lastIndex && oldVal === 0) {
        return true
      } else if (val === 0 && oldVal === lastIndex) {
        return false
      } else {
        return val < oldVal
      }
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
