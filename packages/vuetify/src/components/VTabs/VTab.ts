// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

// Utilities
import { getSlot, keyCodes } from './../../util/helpers'
import mixins from '../../util/mixins'
import { ExtractVue } from './../../util/mixins'

// Types
import { VNode } from 'vue/types'

// Components
import VTabsBar from '../VTabs/VTabsBar'

const baseMixins = mixins(
  Routable,
  // Must be after routable
  // to overwrite activeClass
  GroupableFactory('tabsBar'),
  Themeable
)

type VTabBarInstance = InstanceType<typeof VTabsBar>

interface options extends ExtractVue<typeof baseMixins> {
  $el: HTMLElement
  tabsBar: VTabBarInstance
}

export default baseMixins.extend<options>().extend(
  /* @vue/component */
).extend({
  name: 'v-tab',

  props: {
    ripple: {
      type: [Boolean, Object],
      default: true,
    },
    tabValue: {
      required: false,
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
      if (this.tabValue != null) return this.tabValue

      let to = this.to || this.href

      if (to == null) return to

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

  methods: {
    click (e: KeyboardEvent | MouseEvent): void {
      // Prevent keyboard actions
      // from children elements
      // within disabled tabs
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
    toggle () {
      // VItemGroup treats a change event as a click
      if (!this.isActive || (!this.tabsBar.mandatory && !this.to)) {
        this.$emit('change')
      }
    },
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink()

    data.attrs = {
      ...data.attrs,
      'aria-selected': String(this.isActive),
      role: 'tab',
      tabindex: this.disabled ? -1 : 0,
    }
    data.on = {
      ...data.on,
      keydown: (e: KeyboardEvent) => {
        if (e.keyCode === keyCodes.enter) this.click(e)

        this.$emit('keydown', e)
      },
    }

    return h(tag, data, getSlot(this))
  },
})
