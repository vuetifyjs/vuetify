// Components
import VTabsBar from './VTabsBar'

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
  items: any[]
  tabsBar: InstanceType<typeof VTabsBar>
}

export default baseMixins.extend<options>().extend(
  /* @vue/component */
).extend({
  name: 'v-tab',

  inject: {
    items: {
      default: () => [],
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
    hasRealLink (): boolean {
      return !!this.href && this.href[0] !== '#'
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
    click (e: MouseEvent): void {
      // If user provides an
      // actual link, do not
      // prevent default
      if (!this.hasRealLink) e.preventDefault()

      if (this.disabled) return

      if (e.detail) this.$el.blur()

      this.$emit('click', e)

      this.to || this.toggle()
    },
    getFirstTab () {
      return this.items[0]
    },
    getFocusedTab () {
      return this.items.find((item: any) => document.activeElement === item.$el)
    },
    getLastTab () {
      return this.items[this.items.length - 1]
    },
    getNextTab () {
      const tab = this.getFocusedTab()
      const currentIndex = this.items.findIndex((item: any) => item.$el === tab.$el)
      const targetIndex = (currentIndex + 1) % this.items.length

      return this.items[targetIndex]
    },
    getPrevTab () {
      const tab = this.getFocusedTab()
      const currentIndex = this.items.findIndex((item: any) => item.$el === tab.$el)
      const targetIndex = (currentIndex - 1 + this.items.length) % this.items.length

      return this.items[targetIndex]
    },
    keydown (e: KeyboardEvent): void {
      this.$emit('keydown', e)

      const { down, end, enter, home, left, right, space, up } = keyCodes
      const isVertical = this.tabsBar.vertical
      let targetTab

      switch (e.keyCode) {
        case enter:
        case space:
          e.preventDefault()
          this.$el.click()
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
        // Do not automatically click tab if it has a real link
        if (this.tabsBar.activationMode === 'automatic' && !targetTab.hasRealLink) targetTab.$el.click()
      }
    },
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink()

    data.attrs = {
      ...data.attrs,
      'aria-controls': this.value || undefined,
      'aria-disabled': this.disabled,
      'aria-selected': this.isActive.toString(),
      role: 'tab',
      tabindex: this.isActive ? 0 : -1,
    }
    data.on = {
      ...data.on,
      keydown: this.keydown,
    }

    return h(tag, data, this.$slots.default)
  },
})
