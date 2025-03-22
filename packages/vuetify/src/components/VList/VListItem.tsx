// Styles
import './VListItem.sass'

// Components
import { VListItemSubtitle } from './VListItemSubtitle'
import { VListItemTitle } from './VListItemTitle'
import { VAvatar } from '@/components/VAvatar'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { useList } from './list'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { useNestedItem } from '@/composables/nested/nested'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, onBeforeMount, toDisplayString, watch } from 'vue'
import { deprecate, EventProp, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { RippleDirectiveBinding } from '@/directives/ripple'

export type ListItemSlot = {
  isActive: boolean
  isOpen: boolean
  isSelected: boolean
  isIndeterminate: boolean
  select: (value: boolean) => void
}

export type ListItemTitleSlot = {
  title?: string | number | boolean
}

export type ListItemSubtitleSlot = {
  subtitle?: string | number | boolean
}

export type VListItemSlots = {
  prepend: ListItemSlot
  append: ListItemSlot
  default: ListItemSlot
  title: ListItemTitleSlot
  subtitle: ListItemSubtitleSlot
}

export const makeVListItemProps = propsFactory({
  active: {
    type: Boolean,
    default: undefined,
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: IconValue,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String] as PropType<'one' | 'two' | 'three' | false>,
  link: {
    type: Boolean,
    default: undefined,
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  ripple: {
    type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    default: true,
  },
  slim: Boolean,
  subtitle: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  title: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  value: null,

  onClick: EventProp<[MouseEvent | KeyboardEvent]>(),
  onClickOnce: EventProp<[MouseEvent]>(),

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'text' } as const),
}, 'VListItem')

export const VListItem = genericComponent<VListItemSlots>()({
  name: 'VListItem',

  directives: { Ripple },

  props: makeVListItemProps(),

  emits: {
    click: (e: MouseEvent | KeyboardEvent) => true,
  },

  setup (props, { attrs, slots, emit }) {
    const link = useLink(props, attrs)
    const id = computed(() => props.value === undefined ? link.href.value : props.value)
    const {
      activate,
      isActivated,
      select,
      isOpen,
      isSelected,
      isIndeterminate,
      isGroupActivator,
      root,
      parent,
      openOnSelect,
      id: uid,
    } = useNestedItem(id, false)
    const list = useList()
    const isActive = computed(() =>
      props.active !== false &&
      (props.active || link.isActive?.value || (root.activatable.value ? isActivated.value : isSelected.value))
    )
    const isLink = computed(() => props.link !== false && link.isLink.value)
    const isSelectable = computed(() => (!!list && (root.selectable.value || root.activatable.value || props.value != null)))
    const isClickable = computed(() =>
      !props.disabled &&
      props.link !== false &&
      (props.link || link.isClickable.value || isSelectable.value)
    )

    const roundedProps = computed(() => props.rounded || props.nav)
    const color = computed(() => props.color ?? props.activeColor)
    const variantProps = computed(() => ({
      color: isActive.value ? color.value ?? props.baseColor : props.baseColor,
      variant: props.variant,
    }))

    // useNestedItem doesn't call register until beforeMount,
    // so this can't be an immediate watcher as we don't know parent yet
    watch(() => link.isActive?.value, val => {
      if (!val) return
      handleActiveLink()
    })
    onBeforeMount(() => {
      if (link.isActive?.value) handleActiveLink()
    })
    function handleActiveLink () {
      if (parent.value != null) {
        root.open(parent.value, true)
      }
      openOnSelect(true)
    }

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
      isOpen: isOpen.value,
      isSelected: isSelected.value,
      isIndeterminate: isIndeterminate.value,
    } satisfies ListItemSlot))

    function onClick (e: MouseEvent) {
      emit('click', e)

      if (!isClickable.value) return

      link.navigate?.(e)

      if (isGroupActivator) return

      if (root.activatable.value) {
        activate(!isActivated.value, e)
      } else if (root.selectable.value) {
        select(!isSelected.value, e)
      } else if (props.value != null) {
        select(!isSelected.value, e)
      }
    }

    function onKeyDown (e: KeyboardEvent) {
      const target = e.target as HTMLElement

      if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        e.target!.dispatchEvent(new MouseEvent('click', e))
      }
    }

    useRender(() => {
      const Tag = isLink.value ? 'a' : props.tag
      const hasTitle = (slots.title || props.title != null)
      const hasSubtitle = (slots.subtitle || props.subtitle != null)
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon)
      const hasAppend = !!(hasAppendMedia || slots.append)
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)

      list?.updateHasPrepend(hasPrepend)

      if (props.activeColor) {
        deprecate('active-color', ['color', 'base-color'])
      }

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
              'v-list-item--slim': props.slim,
              [`${props.activeClass}`]: props.activeClass && isActive.value,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            lineClasses.value,
            roundedClasses.value,
            variantClasses.value,
            props.class,
          ]}
          style={[
            colorStyles.value,
            dimensionStyles.value,
            props.style,
          ]}
          tabindex={ isClickable.value ? (list ? -2 : 0) : undefined }
          aria-selected={
            isSelectable.value ? (
              root.activatable.value ? isActivated.value
              : root.selectable.value ? isSelected.value
              : isActive.value
            ) : undefined
          }
          onClick={ onClick }
          onKeydown={ isClickable.value && !isLink.value && onKeyDown }
          v-ripple={ isClickable.value && props.ripple }
          { ...link.linkProps }
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

              <div class="v-list-item__spacer" />
            </div>
          )}

          <div class="v-list-item__content" data-no-activator="">
            { hasTitle && (
              <VListItemTitle key="title">
                { slots.title?.({ title: props.title }) ?? toDisplayString(props.title) }
              </VListItemTitle>
            )}

            { hasSubtitle && (
              <VListItemSubtitle key="subtitle">
                { slots.subtitle?.({ subtitle: props.subtitle }) ?? toDisplayString(props.subtitle) }
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

              <div class="v-list-item__spacer" />
            </div>
          )}
        </Tag>
      )
    })

    return {
      activate,
      isActivated,
      isGroupActivator,
      isSelected,
      list,
      select,
      root,
      id: uid,
      link,
    }
  },
})

export type VListItem = InstanceType<typeof VListItem>
