import { withDirectives, vShow } from 'vue';
// Styles
import './VListGroup.sass'

// Components
import VIcon from '../VIcon'
import VList from './VList'
import VListItem from './VListItem'
import VListItemIcon from './VListItemIcon'

// Mixins
import Bootable from '../../mixins/bootable'
import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import { inject as RegistrableInject } from '../../mixins/registrable'

// Directives
import ripple from '../../directives/ripple'

// Transitions
import { VExpandTransition } from '../transitions'

// Utils
import { defineComponent, h } from 'vue'

// Types
import type { VNode } from 'vue'
import { Route } from 'vue-router'

type VListInstance = InstanceType<typeof VList>

// interface options extends ExtractVue<typeof baseMixins> {
//   list: VListInstance
//   $refs: {
//     group: HTMLElement
//   }
//   $route: Route
// }

export default defineComponent({
  name: 'v-list-group',

  mixins: [
    Bootable,
    Colorable,
    RegistrableInject('list'),
    Toggleable,
  ],

  props: {
    activeClass: {
      type: String,
      default: '',
    },
    appendIcon: {
      type: String,
      default: '$expand',
    },
    color: {
      type: String,
      default: 'primary',
    },
    disabled: Boolean,
    group: String,
    noAction: Boolean,
    prependIcon: String,
    ripple: {
      type: [Boolean, Object],
      default: true,
    },
    subGroup: Boolean,
  },

  computed: {
    classes (): object {
      return {
        'v-list-group--active': this.isActive,
        'v-list-group--disabled': this.disabled,
        'v-list-group--no-action': this.noAction,
        'v-list-group--sub-group': this.subGroup,
      }
    },
  },

  watch: {
    isActive (val: boolean) {
      /* istanbul ignore else */
      if (!this.subGroup && val) {
        this.list && this.list.listClick(this._uid)
      }
    },
    $route: 'onRouteChange',
  },

  created () {
    this.list && this.list.register(this)

    if (this.group &&
      this.$route &&
      this.value == null
    ) {
      this.isActive = this.matchRoute(this.$route.path)
    }
  },

  beforeDestroy () {
    this.list && this.list.unregister(this)
  },

  methods: {
    click (e: Event) {
      if (this.disabled) return

      this.isBooted = true

      this.$emit('click', e)
      this.$nextTick(() => (this.isActive = !this.isActive))
    },
    genIcon (icon: string | false): VNode {
      return h(VIcon, icon)
    },
    genAppendIcon (): VNode | null {
      const icon = !this.subGroup ? this.appendIcon : false

      if (!icon && !this.$slots.appendIcon) return null

      return h(VListItemIcon, {
        class: 'v-list-group__header__append-icon',
      }, [
        this.$slots.appendIcon?.() || this.genIcon(icon),
      ])
    },
    genHeader (): VNode {
      return withDirectives(
        h(VListItem, {
          'aria-expanded': String(this.isActive),
          role: 'button',
          inputValue: this.isActive,
          class: {
            'v-list-group__header': true,
            [this.activeClass]: this.isActive,
          },
        }, [
          this.genPrependIcon(),
          this.$slots.activator?.(),
          this.genAppendIcon(),
        ]),
        [[ripple, this.ripple]]
      )
    },
    genItems (): VNode[] {
      return this.showLazyContent(() => [
        withDirectives(
          h('div', {
            class: 'v-list-group__items',
          }, this.$slots.default?.()),
          [[vShow, this.isActive]]
        ),
      ])
    },
    genPrependIcon (): VNode | null {
      const icon = this.subGroup && this.prependIcon == null
        ? '$subgroup'
        : this.prependIcon

      if (!icon && !this.$slots.prependIcon) return null

      return h(VListItemIcon, {
        class: 'v-list-group__header__prepend-icon',
      }, [
        this.$slots.prependIcon?.() || this.genIcon(icon),
      ])
    },
    onRouteChange (to: Route) {
      /* istanbul ignore if */
      if (!this.group) return

      const isActive = this.matchRoute(to.path)

      /* istanbul ignore else */
      if (isActive && this.isActive !== isActive) {
        this.list && this.list.listClick(this._uid)
      }

      this.isActive = isActive
    },
    toggle (uid: number) {
      const isActive = this._uid === uid

      if (isActive) this.isBooted = true
      this.$nextTick(() => (this.isActive = isActive))
    },
    matchRoute (to: string) {
      return to.match(this.group) !== null
    },
  },

  render () {
    return h('div', this.setTextColor(this.isActive && this.color, {
      class: ['v-list-group', this.classes],
    }), [
      this.genHeader(),
      h(VExpandTransition, this.genItems()),
    ])
  },
})
