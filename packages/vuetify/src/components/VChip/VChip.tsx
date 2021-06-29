// Styles
import './VChip.sass'

// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// import { VExpandXTransition } from '../transitions'

// Utilities
import { computed, defineComponent } from 'vue'
import { makeProps } from '@/util/makeProps'

export default defineComponent({
  name: 'VChip',

  directives: { Ripple },

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
    ripple: {
      type: Boolean,
      default: true,
    },
    textColor: String,
    value: null as any,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'span' }),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'contained' } as const),
  }),

  emits: {
    'click:close': (e: Event) => e,
    'update:active': (value: Boolean) => value,
  },
  setup (props, { attrs, emit, slots }) {
    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props, 'v-chip')
    const { colorClasses, colorStyles, variantClasses } = useVariant(props, 'v-chip')
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'v-chip')
    const { sizeClasses } = useSize(props, 'v-chip')
    const { densityClasses } = useDensity(props, 'v-chip')
    const link = useLink(props, attrs)

    // const isContained = computed(() => {
    //   return !(props.outlined)
    // })

    const isElevated = computed(() => {
      return props.variant === 'contained' && !(props.disabled || props.border)
    })

    const hasClose = computed(() => {
      return Boolean(props.close)
    })

    const isClickable = computed(() => {})

    const close = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
      emit('click:close', e)
      emit('update:active', false)
    }

    return () => {
      const Tag = (link.isLink.value) ? 'a' : props.tag

      return (
        <Tag
          type={Tag === 'a' ? undefined : 'button' }
          class={[
            'v-chip',
            {
              'v-chip--clickable': isClickable.value,
              'v-chip--disabled': props.disabled,
              'v-chip--elevated': isElevated.value,
              'v-chip--draggable': props.draggable,
              'v-chip--label': props.label,
              // 'v-chip--link': props.isLink,
              'v-chip--no-color': !props.color,
              'v-chip--outlined': props.outlined,
              // 'v-chip--pill': props.pill,
              'v-chip--removable': hasClose.value,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            sizeClasses.value,
            variantClasses.value,
          ]}
          style={[
            colorStyles.value,
          ]}
          disabled={ props.disabled || undefined }
          draggable={ props.draggable }
          href={ link.href.value }
          v-ripple={[
            !props.disabled && props.ripple,
            null,
          ]}
          onClick={ props.disabled || link.navigate }
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
          { genOverlays(true, 'v-chip') }

          { slots.default?.() }

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
        </Tag>
      )
    }
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
