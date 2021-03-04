// Styles
import './VChip.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'
import { useColor } from '@/composables/color'

// Directives
import { Ripple, RippleDirectiveBinding } from '@/directives/ripple'

// Components
import VIcon from '@/components/VIcon/VIcon'
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
      default: '',
    },
    close: Boolean,
    closeIcon: {
      type: String,
      default: '$delete',
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close',
    },
    color: {
      type: String,
      default: 'primary',
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
    pill: Boolean,
    ripple: {
      type: Boolean,
      default: true,
    },
    textColor: String,
    value: null as any,

    ...makeSheetProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'span' }),
  }),

  emits: ['click:close', 'update:active'],
  setup (props, { slots, emit }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-chip')

    const { sizeClasses } = useSize(props, 'v-chip')

    const isContained = computed(() => {
      return !(props.outlined)
    })

    const isElevated = computed(() => {
      return isContained.value && !(props.disabled)
    })

    const hasClose = computed(() => {
      return Boolean(props.close)
    })

    const isClickable = computed(() => {})

    const close = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      emit('click:close')
      emit('update:active', false)
    }

    const { colorClasses, colorStyles } = useColor(computed(() => ({
      [isContained.value ? 'background' : 'text']: props.color,
    })))

    return () => withDirectives(
      <props.tag
        class={[
          'v-chip',
          {
            'v-chip--clickable': isClickable.value,
            'v-chip--contained': isContained.value,
            'v-chip--disabled': props.disabled,
            'v-chip--elevated': isElevated.value,
            'v-chip--draggable': props.draggable,
            'v-chip--label': props.label,
            // 'v-chip--link': props.isLink,
            'v-chip--no-color': !props.color,
            'v-chip--outlined': props.outlined,
            'v-chip--pill': props.pill,
            'v-chip--removable': hasClose.value,
          },
          sheetClasses.value,
          colorClasses.value,
          sizeClasses.value,
        ]}
        style={[
          sheetStyles.value,
          colorStyles.value,
        ]}
        disabled={ props.disabled }
        draggable={ props.draggable }
      >
        {
          props.filter && (
            <VIcon
              icon={props.filterIcon}
              class="v-chip__filter"
              props={{
                left: true,
              }}
            />
          )
        }
        <span class="v-chip__content">
          { slots.default?.() }
        </span>
        {
          props.close && (
            <VIcon
              onClick={close}
              icon={props.closeIcon}
              class="v-chip__close"
              aria-label={props.closeLabel}
              props={{
                right: true,
                size: 18,
              }}
            />
          )
        }
      </props.tag>,
      [useDirective<RippleDirectiveBinding>(Ripple, {
        value: props.ripple && !props.disabled,
      })]
    )
  },
})

/*
  data: () => ({
    proxyClass: 'v-chip--active',
  }),

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
})
*/
