/* eslint-disable complexity */
// Styles
import './VChip.sass'

// Components
import { VExpandXTransition } from '@/components/transitions'
import { VAvatar } from '@/components/VAvatar'
import { VChipGroupSymbol } from '@/components/VChipGroup/VChipGroup'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { IconValue } from '@/composables/icons'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, toDisplayString } from 'vue'
import { EventProp, genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { RippleDirectiveBinding } from '@/directives/ripple'

export type VChipSlots = {
  default: {
    isSelected: boolean | undefined
    selectedClass: boolean | (string | undefined)[] | undefined
    select: ((value: boolean) => void) | undefined
    toggle: (() => void) | undefined
    value: unknown
    disabled: boolean
  }
  label: never
  prepend: never
  append: never
  close: never
  filter: never
}

export const makeVChipProps = propsFactory({
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
    type: IconValue,
    default: '$complete',
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: undefined,
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    default: true,
  },
  text: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: true,
  },

  onClick: EventProp<[MouseEvent]>(),
  onClickOnce: EventProp<[MouseEvent]>(),

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'span' }),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'tonal' } as const),
}, 'VChip')

export const VChip = genericComponent<VChipSlots>()({
  name: 'VChip',

  directives: { Ripple },

  props: makeVChipProps(),

  emits: {
    'click:close': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
    'group:selected': (val: { value: boolean }) => true,
    click: (e: MouseEvent | KeyboardEvent) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { t } = useLocale()
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
    const isLink = computed(() => props.link !== false && link.isLink.value)
    const isClickable = computed(() =>
      !props.disabled &&
      props.link !== false &&
      (!!group || props.link || link.isClickable.value)
    )
    const closeProps = computed(() => ({
      'aria-label': t(props.closeLabel),
      onClick (e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()

        isActive.value = false

        emit('click:close', e)
      },
    }))

    function onClick (e: MouseEvent) {
      emit('click', e)

      if (!isClickable.value) return

      link.navigate?.(e)
      group?.toggle()
    }

    function onKeyDown (e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick(e as any as MouseEvent)
      }
    }

    return () => {
      const Tag = (link.isLink.value) ? 'a' : props.tag
      const hasAppendMedia = !!(props.appendIcon || props.appendAvatar)
      const hasAppend = !!(hasAppendMedia || slots.append)
      const hasClose = !!(slots.close || props.closable)
      const hasFilter = !!(slots.filter || props.filter) && group
      const hasPrependMedia = !!(props.prependIcon || props.prependAvatar)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)
      const hasColor = !group || group.isSelected.value

      return isActive.value && (
        <Tag
          class={[
            'v-chip',
            {
              'v-chip--disabled': props.disabled,
              'v-chip--label': props.label,
              'v-chip--link': isClickable.value,
              'v-chip--filter': hasFilter,
              'v-chip--pill': props.pill,
              [`${props.activeClass}`]: props.activeClass && link.isActive?.value,
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
            props.class,
          ]}
          style={[
            hasColor ? colorStyles.value : undefined,
            props.style,
          ]}
          disabled={ props.disabled || undefined }
          draggable={ props.draggable }
          tabindex={ isClickable.value ? 0 : undefined }
          onClick={ onClick }
          onKeydown={ isClickable.value && !isLink.value && onKeyDown }
          v-ripple={[isClickable.value && props.ripple, null]}
          { ...link.linkProps }
        >
          { genOverlays(isClickable.value, 'v-chip') }

          { hasFilter && (
            <VExpandXTransition key="filter">
              <div
                class="v-chip__filter"
                v-show={ group.isSelected.value }
              >
                { !slots.filter ? (
                  <VIcon
                    key="filter-icon"
                    icon={ props.filterIcon }
                  />
                ) : (
                  <VDefaultsProvider
                    key="filter-defaults"
                    disabled={ !props.filterIcon }
                    defaults={{
                      VIcon: { icon: props.filterIcon },
                    }}
                    v-slots:default={ slots.filter }
                  />
                )}
              </div>
            </VExpandXTransition>
          )}

          { hasPrepend && (
            <div key="prepend" class="v-chip__prepend">
              { !slots.prepend ? (
                <>
                  { props.prependIcon && (
                    <VIcon
                      key="prepend-icon"
                      icon={ props.prependIcon }
                      start
                    />
                  )}

                  { props.prependAvatar && (
                    <VAvatar
                      key="prepend-avatar"
                      image={ props.prependAvatar }
                      start
                    />
                  )}
                </>
              ) : (
                <VDefaultsProvider
                  key="prepend-defaults"
                  disabled={ !hasPrependMedia }
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
                  v-slots:default={ slots.prepend }
                />
              )}
            </div>
          )}

          <div class="v-chip__content" data-no-activator="">
            { slots.default?.({
              isSelected: group?.isSelected.value,
              selectedClass: group?.selectedClass.value,
              select: group?.select,
              toggle: group?.toggle,
              value: group?.value.value,
              disabled: props.disabled,
            }) ?? toDisplayString(props.text)}
          </div>

          { hasAppend && (
            <div key="append" class="v-chip__append">
              { !slots.append ? (
                <>
                  { props.appendIcon && (
                    <VIcon
                      key="append-icon"
                      end
                      icon={ props.appendIcon }
                    />
                  )}

                  { props.appendAvatar && (
                    <VAvatar
                      key="append-avatar"
                      end
                      image={ props.appendAvatar }
                    />
                  )}
                </>
              ) : (
                <VDefaultsProvider
                  key="append-defaults"
                  disabled={ !hasAppendMedia }
                  defaults={{
                    VAvatar: {
                      end: true,
                      image: props.appendAvatar,
                    },
                    VIcon: {
                      end: true,
                      icon: props.appendIcon,
                    },
                  }}
                  v-slots:default={ slots.append }
                />
              )}
            </div>
          )}

          { hasClose && (
            <button
              key="close"
              class="v-chip__close"
              type="button"
              data-testid="close-chip"
              { ...closeProps.value }
            >
              { !slots.close ? (
                <VIcon
                  key="close-icon"
                  icon={ props.closeIcon }
                  size="x-small"
                />
              ) : (
                <VDefaultsProvider
                  key="close-defaults"
                  defaults={{
                    VIcon: {
                      icon: props.closeIcon,
                      size: 'x-small',
                    },
                  }}
                  v-slots:default={ slots.close }
                />
              )}
            </button>
          )}
        </Tag>
      )
    }
  },
})

export type VChip = InstanceType<typeof VChip>
