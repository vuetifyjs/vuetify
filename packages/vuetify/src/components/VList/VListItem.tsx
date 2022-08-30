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
import { genericComponent, useRender } from '@/util'

// Types
import type { MakeSlots } from '@/util'
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

export const VListItem = genericComponent<new () => {
  $slots: MakeSlots<{
    prepend: [ListItemSlot]
    append: [ListItemSlot]
    default: [ListItemSlot]
    title: [ListItemTitleSlot]
    subtitle: [ListItemSubtitleSlot]
  }>
}>()({
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
    subtitle: [String, Number, Boolean],
    title: [String, Number, Boolean],
    value: null,

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

  setup (props, { attrs, slots }) {
    const link = useLink(props, attrs)
    const id = computed(() => props.value ?? link.href.value)
    const { select, isSelected, isIndeterminate, isGroupActivator, root, parent, openOnSelect } = useNestedItem(id, false)
    const list = useList()
    const isActive = computed(() =>
      props.active !== false &&
      (props.active || link.isExactActive?.value || isSelected.value)
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

    watch(() => link.isExactActive?.value, val => {
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

    useRender(() => {
      const Tag = isLink.value ? 'a' : props.tag
      const hasColor = !list || isSelected.value || isActive.value
      const hasTitle = (slots.title || props.title)
      const hasSubtitle = (slots.subtitle || props.subtitle)
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon)
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon)

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
              [`${props.activeClass}`]: isActive.value,
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
          onClick={ isClickable.value && ((e: MouseEvent) => {
            if (isGroupActivator) return

            link.navigate?.(e)
            props.value != null && select(!isSelected.value, e)
          })}
          v-ripple={ isClickable.value }
        >
          { genOverlays(isClickable.value || isActive.value, 'v-list-item') }

          { hasPrepend && (
            <VDefaultsProvider
              key="prepend"
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
              <div class="v-list-item__prepend">
                { props.prependAvatar && (
                  <VAvatar key="prepend-avatar" />
                ) }

                { props.prependIcon && (
                  <VIcon key="prepend-icon" />
                ) }

                { slots.prepend?.(slotProps.value) }
              </div>
            </VDefaultsProvider>
          ) }

          <div class="v-list-item__content">
            { hasTitle && (
              <VListItemTitle key="title">
                { slots.title?.({ title: props.title }) ?? props.title}
              </VListItemTitle>
            ) }

            { hasSubtitle && (
              <VListItemSubtitle key="subtitle">
                { slots.subtitle?.({ subtitle: props.subtitle }) ?? props.subtitle }
              </VListItemSubtitle>
            ) }

            { slots.default?.(slotProps.value) }
          </div>

          { hasAppend && (
            <VDefaultsProvider
              key="append"
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
              <div class="v-list-item__append">
                { slots.append?.(slotProps.value) }

                { props.appendIcon && (
                  <VIcon key="append-icon" />
                ) }

                { props.appendAvatar && (
                  <VAvatar key="append-avatar" />
                ) }
              </div>
            </VDefaultsProvider>
          ) }
        </Tag>
      )
    })

    return {}
  },
})

export type VListItem = InstanceType<typeof VListItem>
