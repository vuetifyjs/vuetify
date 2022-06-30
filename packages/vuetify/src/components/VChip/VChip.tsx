/* eslint-disable complexity */
// Styles
import './VChip.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VChipGroupSymbol } from '@/components/VChipGroup/VChipGroup'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VExpandXTransition } from '@/components/transitions'
import { VIcon } from '@/components/VIcon'

// Composables
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'
import { IconValue } from '@/composables/icons'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { defineComponent } from '@/util'

export const VChip = defineComponent({
  name: 'VChip',

  directives: { Ripple },

  props: {
    activeClass: String,
    appendAvatar: String,
    appendIcon: IconValue,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: '$delete',
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close',
    },
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: '$complete',
    },
    label: Boolean,
    link: Boolean,
    pill: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: Boolean,
      default: true,
    },
    text: String,
    modelValue: {
      type: Boolean,
      default: true,
    },

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'span' }),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'tonal' } as const),
  },

  emits: {
    'click:close': (e: Event) => true,
    'update:active': (value: Boolean) => true,
    'update:modelValue': (value: Boolean) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { borderClasses } = useBorder(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(props)
    const { densityClasses } = useDensity(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const { sizeClasses } = useSize(props)
    const { themeClasses } = provideTheme(props)

    const isActive = useProxiedModel(props, 'modelValue')
    const group = useGroupItem(props, VChipGroupSymbol, false)
    const link = useLink(props, attrs)

    function onCloseClick (e: Event) {
      isActive.value = false

      emit('click:close', e)
    }

    return () => {
      const Tag = (link.isLink.value) ? 'a' : props.tag
      const hasAppend = !!(slots.append || props.appendIcon || props.appendAvatar)
      const hasClose = !!(slots.close || props.closable)
      const hasFilter = !!(slots.filter || props.filter) && group
      const hasPrepend = !!(slots.prepend || props.prependIcon || props.prependAvatar)
      const hasColor = !group || group.isSelected.value
      const isClickable = !props.disabled && (!!group || link.isClickable.value || props.link)
      const onClickFunc = props.link ? props.link : group?.toggle

      return isActive.value && (
        <Tag
          class={[
            'v-chip',
            {
              'v-chip--disabled': props.disabled,
              'v-chip--label': props.label,
              'v-chip--link': isClickable,
              'v-chip--filter': hasFilter,
              'v-chip--pill': props.pill,
            },
            themeClasses.value,
            borderClasses.value,
            hasColor ? colorClasses.value : undefined,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            sizeClasses.value,
            variantClasses.value,
            group?.selectedClass.value,
          ]}
          style={[
            hasColor ? colorStyles.value : undefined,
          ]}
          disabled={ props.disabled || undefined }
          draggable={ props.draggable }
          href={ link.href.value }
          v-ripple={ [isClickable && props.ripple, null] }
          onClick={ isClickable && onClickFunc }
        >
          { genOverlays(isClickable, 'v-chip') }

          { hasFilter && (
            <VDefaultsProvider
              key="filter"
              defaults={{
                VIcon: { icon: props.filterIcon },
              }}
            >
              <VExpandXTransition>
                <div
                  class="v-chip__filter"
                  v-show={ group.isSelected.value }
                >
                  { slots.filter ? slots.filter() : (<VIcon />) }
                </div>
              </VExpandXTransition>
            </VDefaultsProvider>
          ) }

          { hasPrepend && (
            <VDefaultsProvider
              key="prepend"
              defaults={{
                VAvatar: {
                  image: props.prependAvatar,
                },
                VIcon: {
                  icon: props.prependIcon,
                },
              }}
            >
              { slots.prepend
                ? (
                  <div class="v-chip__prepend">
                    { slots.prepend() }
                  </div>
                )
                : props.prependAvatar ? (<VAvatar start />)
                : props.prependIcon ? (<VIcon start />)
                : undefined
              }
            </VDefaultsProvider>
          ) }

          { slots.default?.({
            isSelected: group?.isSelected.value,
            selectedClass: group?.selectedClass.value,
            select: group?.select,
            toggle: group?.toggle,
            value: group?.value.value,
            disabled: props.disabled,
          }) ?? props.text }

          { hasAppend && (
            <VDefaultsProvider
              key="append"
              defaults={{
                VAvatar: {
                  image: props.appendAvatar,
                },
                VIcon: {
                  icon: props.appendIcon,
                },
              }}
            >
              { slots.append
                ? (
                  <div class="v-chip__append">
                    { slots.append() }
                  </div>
                )
                : props.appendAvatar ? (<VAvatar end />)
                : props.appendIcon ? (<VIcon end />)
                : undefined
              }
            </VDefaultsProvider>
          ) }

          { hasClose && (
            <VDefaultsProvider
              key="close"
              defaults={{
                VIcon: {
                  icon: props.closeIcon,
                  size: 'x-small',
                },
              }}
            >
              <div
                class="v-chip__close"
                onClick={ onCloseClick }
              >
                { slots.close ? slots.close() : (<VIcon />) }
              </div>
            </VDefaultsProvider>
          ) }
        </Tag>
      )
    }
  },
})

export type VChip = InstanceType<typeof VChip>
