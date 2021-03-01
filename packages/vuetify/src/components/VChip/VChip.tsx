// Styles
import './VChip.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useColor } from '@/composables/color'

// Directives
import { Ripple, RippleDirectiveBinding } from '@/directives/ripple'

// Components
// import { VExpandXTransition } from '../transitions'

// Utilities
import { computed, defineComponent, withDirectives } from 'vue'
import makeProps from '@/util/makeProps'
import { useDirective } from '@/util/useDirective'
import { makeSizeProps, useSize } from '@/composables/size'

export default defineComponent({
  name: 'VChip',

  props: makeProps({
    active: {
      type: Boolean,
      default: true,
    },
    activeClass: {
      type: String,
      default (): string | undefined {
        if (!this.chipGroup) return ''

        return this.chipGroup.activeClass
      },
    } as any as PropValidator<string>,
    close: Boolean,
    closeIcon: {
      type: String,
      default: '$delete',
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close',
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
    textColor: String,
    value: null as any as PropType<any>,

    ...makeSizeProps(),
    ...makeTagProps({ tag: 'span' })
  }),

  setup (props, { slots }) {
    const { sizeClasses } = useSize(props, 'v-chip')
    
    const isContained = computed(() => {
      return !(props.outlined)
    })

    const isElevated = computed(() => {
      return isContained.value && !(props.disabled)
    })

    const { colorClasses, colorStyles } = useColor(computed(() => ({
      [isContained.value ? 'background' : 'text']: props.color
    })))

    return () => withDirectives(
      <props.tag
        class={[
          'v-chip',
          {
            'v-chip--clickable': this.isClickable,
            'v-chip--contained': isContained.value,
            'v-chip--disabled': props.disabled,
            'v-chip--elevated': isElevated.value,
            'v-chip--draggable': props.draggable,
            'v-chip--label': props.label,
            'v-chip--link': props.isLink,
            'v-chip--no-color': !props.color,
            'v-chip--outlined': props.outlined,
            'v-chip--pill': props.pill,
            'v-chip--removable': props.hasClose,
          },
          colorClasses.value,
          sizeClasses.value,
        ]}
        style={[
          colorStyles.value
        ]}
        disabled={ props.disabled }
      >

      </props.tag>
      [useDirective<RippleDirectiveBinding>(Ripple, {
        value: !props.disabled
      })]
    )
  }
})

// Mixins
// import Colorable from '../../mixins/colorable'
// import { factory as GroupableFactory } from '../../mixins/groupable'
// import Themeable from '../../mixins/themeable'
// import { factory as ToggleableFactory } from '../../mixins/toggleable'
// import Routable from '../../mixins/routable'

/*
  data: () => ({
    proxyClass: 'v-chip--active',
  }),

  computed: {
    classes (): object {
      return {
        'v-chip': true,
        ...Routable.options.computed.classes.call(this),
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
        Routable.options.computed.isClickable.call(this) ||
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
*/
    /* istanbul ignore next */
    /*
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
          this.$createElement(VIcon, {
            staticClass: 'v-chip__filter',
            props: { left: true },
          }, this.filterIcon)
        )
      }

      return this.$createElement(VExpandXTransition, children)
    },
    genClose (): VNode {
      return this.$createElement(VIcon, {
        staticClass: 'v-chip__close',
        props: {
          right: true,
          size: 18,
        },
        attrs: {
          'aria-label': this.$vuetify.lang.t(this.closeLabel),
        },
        on: {
          click: (e: Event) => {
            e.stopPropagation()
            e.preventDefault()

            this.$emit('click:close')
            this.$emit('update:active', false)
          },
        },
      }, this.closeIcon)
    },
    genContent (): VNode {
      return this.$createElement('span', {
        staticClass: 'v-chip__content',
      }, [
        this.filter && this.genFilter(),
        this.$slots.default,
        this.hasClose && this.genClose(),
      ])
    },
  },

  render (h): VNode {
    const children = [this.genContent()]
    let { tag, data } = this.generateRouteLink()

    data.attrs = {
      ...data.attrs,
      draggable: this.draggable ? 'true' : undefined,
      tabindex: this.chipGroup && !this.disabled ? 0 : data.attrs!.tabindex,
    }
    data.directives!.push({
      name: 'show',
      value: this.active,
    })
    data = this.setBackgroundColor(this.color, data)

    const color = this.textColor || (this.outlined && this.color)

    return h(tag, this.setTextColor(color, data), children)
  },
})*/
