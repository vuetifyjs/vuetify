// Styles
import './VListItem.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VListItemSubtitle } from './VListItemSubtitle'
import { VListItemTitle } from './VListItemTitle'

// Directives
import { Ripple } from '@/directives/ripple'

// Composables
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'
import { IconValue } from '@/composables/icons'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useList } from './list'
import { useNestedItem } from '@/composables/nested/nested'

// Utilities
import { computed, watch } from 'vue'
import { EventProp, genericComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

type ListItemSlot = {
  isActive: boolean
  activate: (value: boolean) => void
  isSelected: boolean
  select: (value: boolean) => void
}

export type ListItemTitleSlot = {
  title?: string
}

export type ListItemSubtitleSlot = {
  subtitle?: string
}

type VListItemSlots = {
  prepend: [ListItemSlot]
  append: [ListItemSlot]
  default: [ListItemSlot]
  title: [ListItemTitleSlot]
  subtitle: [ListItemSubtitleSlot]
}

export const VListItem = genericComponent<VListItemSlots>()({
  name: 'VListItem',

  directives: { Ripple },

  props: {
    active: {
      type: Boolean,
      default: undefined,
    },
    activeClass: String,
    activeColor: String,
    appendAvatar: String,
    appendIcon: IconValue,
    disabled: Boolean,
    lines: String as PropType<'one' | 'two' | 'three'>,
    link: {
      type: Boolean,
      default: undefined,
    },
    nav: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: Boolean,
      default: true,
    },
    subtitle: [String, Number, Boolean],
    title: [String, Number, Boolean],
    value: null,

    onClick: EventProp<[MouseEvent]>(),
    onClickOnce: EventProp<[MouseEvent]>(),

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'text' } as const),
  },

  emits: {
    click: (e: MouseEvent | KeyboardEvent) => true,
  },

  setup (props, { attrs, slots, emit }) {
    const link = useLink(props, attrs)
    const id = computed(() => props.value ?? link.href.value)
    const { select, isSelected, isIndeterminate, isGroupActivator, root, parent, openOnSelect } = useNestedItem(id, false)
    const list = useList()
    const isActive = computed(() =>
      props.active !== false &&
      (props.active || link.isActive?.value || isSelected.value)
    )
    const isLink = computed(() => props.link !== false && link.isLink.value)
    const isClickable = computed(() =>
      !props.disabled &&
      props.link !== false &&
      (props.link || link.isClickable.value || (props.value != null && !!list))
    )

    const roundedProps = computed(() => props.rounded || props.nav)
    const variantProps = computed(() => ({
      color: isActive.value ? props.activeColor ?? props.color : props.color,
      variant: props.variant,
    }))

    watch(() => link.isActive?.value, val => {
      if (val && parent.value != null) {
        root.open(parent.value, true)
      }

      if (val) {
        openOnSelect(val)
      }
    }, { immediate: true })

    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(variantProps)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(roundedProps)
    const lineClasses = computed(() => props.lines ? `v-list-item--${props.lines}-line` : undefined)

    const slotProps = computed(() => ({
      isActive: isActive.value,
      select,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value,
    }))

    function onClick (e: MouseEvent) {
      emit('click', e)

      if (isGroupActivator || !isClickable.value) return

      link.navigate?.(e)
      props.value != null && select(!isSelected.value, e)
    }

    function onKeyDown (e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick(e as any as MouseEvent)
      }
    }

    useRender(() => {
      const Tag = isLink.value ? 'a' : props.tag
      const hasColor = !list || isSelected.value || isActive.value
      const hasTitle = (slots.title || props.title)
      const hasSubtitle = (slots.subtitle || props.subtitle)
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon)
      const hasAppend = !!(hasAppendMedia || slots.append)
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)

      list?.updateHasPrepend(hasPrepend)

      return (
        <Tag
          class={[
            'v-list-item',
            {
              'v-list-item--active': isActive.value,
              'v-list-item--disabled': props.disabled,
              'v-list-item--link': isClickable.value,
              'v-list-item--nav': props.nav,
              'v-list-item--prepend': !hasPrepend && list?.hasPrepend.value,
              [`${props.activeClass}`]: props.activeClass && isActive.value,
            },
            themeClasses.value,
            borderClasses.value,
            hasColor ? colorClasses.value : undefined,
            densityClasses.value,
            elevationClasses.value,
            lineClasses.value,
            roundedClasses.value,
            variantClasses.value,
          ]}
          style={[
            hasColor ? colorStyles.value : undefined,
            dimensionStyles.value,
          ]}
          href={ link.href.value }
          tabindex={ isClickable.value ? 0 : undefined }
          onClick={ onClick }
          onKeydown={ isClickable.value && !isLink.value && onKeyDown }
          v-ripple={ isClickable.value && props.ripple }
        >
          { genOverlays(isClickable.value || isActive.value, 'v-list-item') }

          { hasPrepend && (
            <div key="prepend" class="v-list-item__prepend">
              { !slots.prepend ? (
                <>
                  { props.prependAvatar && (
                    <VAvatar
                      key="prepend-avatar"
                      density={ props.density }
                      image={ props.prependAvatar }
                    />
                  )}

                  { props.prependIcon && (
                    <VIcon
                      key="prepend-icon"
                      density={ props.density }
                      icon={ props.prependIcon }
                    />
                  )}
                </>
              ) : (
                <VDefaultsProvider
                  key="prepend-defaults"
                  disabled={ !hasPrependMedia }
                  defaults={{
                    VAvatar: {
                      density: props.density,
                      image: props.prependAvatar,
                    },
                    VIcon: {
                      density: props.density,
                      icon: props.prependIcon,
                    },
                    VListItemAction: {
                      start: true,
                    },
                  }}
                >
                  { slots.prepend?.(slotProps.value) }
                </VDefaultsProvider>
              )}
            </div>
          )}

          <div class="v-list-item__content" data-no-activator="">
            { hasTitle && (
              <VListItemTitle key="title">
                { slots.title?.({ title: props.title }) ?? props.title }
              </VListItemTitle>
            )}

            { hasSubtitle && (
              <VListItemSubtitle key="subtitle">
                { slots.subtitle?.({ subtitle: props.subtitle }) ?? props.subtitle }
              </VListItemSubtitle>
            )}

            { slots.default?.(slotProps.value) }
          </div>

          { hasAppend && (
            <div key="append" class="v-list-item__append">
              { !slots.append ? (
                <>
                  { props.appendIcon && (
                    <VIcon
                      key="append-icon"
                      density={ props.density }
                      icon={ props.appendIcon }
                    />
                  )}

                  { props.appendAvatar && (
                    <VAvatar
                      key="append-avatar"
                      density={ props.density }
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
                      density: props.density,
                      image: props.appendAvatar,
                    },
                    VIcon: {
                      density: props.density,
                      icon: props.appendIcon,
                    },
                    VListItemAction: {
                      end: true,
                    },
                  }}
                >
                  { slots.append?.(slotProps.value) }
                </VDefaultsProvider>
              )}
            </div>
          )}
        </Tag>
      )
    })

    return {}
  },
})

export type VListItem = InstanceType<typeof VListItem>
