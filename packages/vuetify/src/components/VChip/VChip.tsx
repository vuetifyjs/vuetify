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
    appendIcon: String,
    closable: Boolean,
    closeIcon: {
      type: String,
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
    prependIcon: String,
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
    ...makeVariantProps({ variant: 'contained-text' } as const),
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
              defaults={{
                VIcon: { icon: props.filterIcon },
              }}
            >
              <VExpandXTransition>
                <div
                  class="v-chip__filter"
                  v-show={ group.isSelected.value }
                >
                  { slots.filter ? slots.filter() : <VIcon /> }
                </div>
              </VExpandXTransition>
            </VDefaultsProvider>
          ) }

          { hasPrepend && (
            <VDefaultsProvider
              defaults={{
                VAvatar: {
                  image: props.prependAvatar,
                  start: true,
                },
                VIcon: {
                  icon: props.prependIcon,
                  start: true,
                },
              }}
            >
              { slots.prepend
                ? (
                  <div class="v-chip__prepend">
                    { slots.prepend() }
                  </div>
                )
                : props.prependAvatar ? (<VAvatar />)
                : props.prependIcon ? (<VIcon />)
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
              defaults={{
                VAvatar: {
                  image: props.appendAvatar,
                  end: true,
                },
                VIcon: {
                  icon: props.appendIcon,
                  end: true,
                },
              }}
            >
              { slots.append
                ? (
                  <div class="v-chip__append">
                    { slots.append() }
                  </div>
                )
                : props.appendAvatar ? (<VAvatar />)
                : props.appendIcon ? (<VIcon />)
                : undefined
              }
            </VDefaultsProvider>
          ) }

          { hasClose && (
            <VDefaultsProvider
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
