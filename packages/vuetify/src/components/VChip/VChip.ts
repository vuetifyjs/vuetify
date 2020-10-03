// Styles
import './VChip.sass'

// Components
import { VExpandXTransition } from '../transitions'
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import { factory as GroupableFactory } from '../../mixins/groupable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'
import Routable from '../../mixins/routable'
import Sizeable from '../../mixins/sizeable'

// Utilities
import { defineComponent, h, cloneVNode, withDirectives, vShow } from 'vue'
import { breaking } from '../../util/console'

// Types
import type { VNode, Prop } from 'vue'

export default defineComponent({
  name: 'v-chip',

  mixins: [
    Colorable,
    Sizeable,
    Routable,
    Themeable,
    GroupableFactory('chipGroup'),
    ToggleableFactory('inputValue'),
  ],

  props: {
    active: {
      type: Boolean,
      default: true,
    },
    activeClass: {
      type: String,
      default (): string | undefined {
        // TODO
        // if (!this.chipGroup) return ''

        // return this.chipGroup.activeClass
      },
    } as Prop<string>,
    close: Boolean,
    closeIcon: {
      type: String,
      default: '$delete',
    },
    disabled: Boolean,
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: '$complete',
    },
    label: Boolean,
    link: Boolean,
    outlined: Boolean,
    pill: Boolean,
    tag: {
      type: String,
      default: 'span',
    },
    textColor: String,
    value: null as any as Prop<any>,
  },

  data: () => ({
    proxyClass: 'v-chip--active',
  }),

  computed: {
    classes (): object {
      return {
        'v-chip': true,
        ...Routable.computed!.classes.call(this),
        'v-chip--clickable': this.isClickable,
        'v-chip--disabled': this.disabled,
        'v-chip--draggable': this.draggable,
        'v-chip--label': this.label,
        'v-chip--link': this.isLink,
        'v-chip--no-color': !this.color,
        'v-chip--outlined': this.outlined,
        'v-chip--pill': this.pill,
        'v-chip--removable': this.hasClose,
        ...this.themeClasses,
        ...this.sizeableClasses,
        ...this.groupClasses,
      }
    },
    hasClose (): boolean {
      return Boolean(this.close)
    },
    isClickable (): boolean {
      return Boolean(
        Routable.computed!.isClickable.call(this) ||
        this.chipGroup
      )
    },
  },

  created () {
    const breakingProps = [
      ['outline', 'outlined'],
      ['selected', 'input-value'],
      ['value', 'active'],
      ['@input', '@active.sync'],
    ]

    /* istanbul ignore next */
    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) breaking(original, replacement, this)
    })
  },

  methods: {
    click (e: MouseEvent): void {
      this.$emit('click', e)

      this.chipGroup && this.toggle()
    },
    genFilter (): VNode {
      const children = []

      if (this.isActive) {
        children.push(
          h(VIcon, {
            class: 'v-chip__filter',
            left: true,
          }, () => this.filterIcon)
        )
      }

      return h(VExpandXTransition, children)
    },
    genClose (): VNode {
      return h(VIcon, {
        class: 'v-chip__close',
        right: true,
        size: 18,
        onClick: (e: Event) => {
          e.stopPropagation()
          e.preventDefault()

          this.$emit('click:close')
          this.$emit('update:active', false)
        },
      }, this.closeIcon)
    },
    genContent (): VNode {
      return h('span', {
        class: 'v-chip__content',
      }, [
        this.filter && this.genFilter(),
        this.$slots.default?.(),
        this.hasClose && this.genClose(),
      ])
    },
  },

  render (): VNode {
    const children = [this.genContent()]
    const vnode = this.generateRouteLink(children)
    const data: Dictionary = {
      draggable: this.draggable ? 'true' : undefined,
      tabindex: this.chipGroup && !this.disabled ? 0 : this.$attrs.tabindex,
    }

    const textColor = this.textColor || (this.outlined && this.color)

    return withDirectives(cloneVNode(vnode, this.setTextColor(textColor, this.setBackgroundColor(this.color, data))), [
      [vShow, this.active],
    ])
  },
})
