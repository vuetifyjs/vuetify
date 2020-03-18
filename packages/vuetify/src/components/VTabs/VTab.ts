// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

// Utilities
import { keyCodes } from './../../util/helpers'
import mixins from '../../util/mixins'
import { ExtractVue } from './../../util/mixins'

// Types
import { VNode } from 'vue/types'

const baseMixins = mixins(
  Routable,
  // Must be after routable
  // to overwrite activeClass
  GroupableFactory('tabsBar'),
  Themeable
)

interface options extends ExtractVue<typeof baseMixins> {
  $el: HTMLElement
  activationMode: string
  items: any[]
  vertical: boolean
}

export default baseMixins.extend<options>().extend(
  /* @vue/component */
).extend({
  name: 'v-tab',

  inject: {
    activationMode: {
      default: 'manual',
    },
    items: {
      default: () => [],
    },
    vertical: {
      default: false,
    },
  },

  props: {
    ripple: {
      type: [Boolean, Object],
      default: true,
    },
  },

  data: () => ({
    proxyClass: 'v-tab--active',
  }),

  computed: {
    classes (): object {
      return {
        'v-tab': true,
        ...Routable.options.computed.classes.call(this),
        'v-tab--disabled': this.disabled,
        ...this.groupClasses,
      }
    },
    value (): any {
      let to = this.to || this.href || ''

      if (this.$router &&
        this.to === Object(this.to)
      ) {
        const resolve = this.$router.resolve(
          this.to,
          this.$route,
          this.append
        )

        to = resolve.href
      }

      return to.replace('#', '')
    },
  },

  mounted () {
    this.onRouteChange()
  },

  methods: {
    click (e: KeyboardEvent | MouseEvent): void {
      if (this.disabled) {
        e.preventDefault()
        return
      }

      // If user provides an
      // actual link, do not
      // prevent default
      if (this.href &&
        this.href.indexOf('#') > -1
      ) e.preventDefault()

      if (e.detail) this.$el.blur()

      this.$emit('click', e)

      this.to || this.toggle()
    },
    getFirstTab () {
      return this.items.find((item: any) => !item.disabled)
    },
    getFocusedTab () {
      return this.items.find((item: any) => document.activeElement === item.$el)
    },
    getLastTab () {
      return [...this.items].reverse().find((item: any) => !item.disabled)
    },
    getNextTab () {
      const tab = this.getFocusedTab()
      const tabIndex = this.items.findIndex((item: any) => item.value === tab.value)
      const nextTabs = [...this.items.slice(tabIndex + 1), ...this.items.slice(0, tabIndex + 1)]
      return nextTabs.find((item: any) => !item.disabled)
    },
    getPrevTab () {
      const tab = this.getFocusedTab()
      const tabIndex = this.items.findIndex((item: any) => item.value === tab.value)
      const prevTabs = [...this.items.slice(tabIndex), ...this.items.slice(0, tabIndex)].reverse()
      return prevTabs.find((item: any) => !item.disabled)
    },
    onKeyDown (e: KeyboardEvent): void {
      this.$emit('keydown', e)

      const { down, end, enter, home, left, right, space, up } = keyCodes
      const isVertical = this.vertical
      let targetTab
      switch (e.keyCode) {
        case enter:
        case space:
          this.click(e)
          break
        case home:
          targetTab = this.getFirstTab()
          break
        case end:
          targetTab = this.getLastTab()
          break
        case left:
          if (!isVertical) targetTab = this.getPrevTab()
          break
        case up:
          if (isVertical) targetTab = this.getPrevTab()
          break
        case right:
          if (!isVertical) targetTab = this.getNextTab()
          break
        case down:
          if (isVertical) targetTab = this.getNextTab()
          break
      }
      if (targetTab) {
        e.preventDefault()
        targetTab.$el.focus()
        if (this.activationMode === 'automatic') targetTab.click(e)
      }
    },
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink()

    data.attrs = {
      ...data.attrs,
      'aria-controls': this.value,
      'aria-selected': String(this.isActive),
      role: 'tab',
      tabindex: this.isActive ? 0 : -1,
    }
    data.on = {
      ...data.on,
      keydown: this.onKeyDown,
    }

    return h(tag, data, this.$slots.default)
  },
})
