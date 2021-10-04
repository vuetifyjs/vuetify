// Styles
import './VListItem.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VListItemAvatar } from './VListItemAvatar'
import { VListItemHeader } from './VListItemHeader'
import { VListItemSubtitle } from './VListItemSubtitle'
import { VListItemTitle } from './VListItemTitle'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'

export const VListItem = defineComponent({
  name: 'VListItem',

  directives: { Ripple },

  props: {
    active: Boolean,
    activeColor: String,
    activeClass: String,
    appendAvatar: String,
    appendIcon: String,
    disabled: Boolean,
    link: Boolean,
    prependAvatar: String,
    prependIcon: String,
    subtitle: String,
    title: String,

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
    const isActive = computed(() => {
      return props.active || link.isExactActive?.value
    })
    const activeColor = props.activeColor ?? props.color
    const variantProps = computed(() => ({
      color: isActive.value ? activeColor : props.color,
      textColor: props.textColor,
      variant: props.variant,
    }))

    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props, 'v-list-item')
    const { colorClasses, colorStyles, variantClasses } = useVariant(variantProps, 'v-list-item')
    const { densityClasses } = useDensity(props, 'v-list-item')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'v-list-item')

    return () => {
      const Tag = (link.isLink.value) ? 'a' : props.tag
      const hasTitle = (slots.title || props.title)
      const hasSubtitle = (slots.subtitle || props.subtitle)
      const hasHeader = !!(hasTitle || hasSubtitle)
      const hasAppend = (slots.append || props.appendAvatar || props.appendIcon)
      const hasPrepend = (slots.prepend || props.prependAvatar || props.prependIcon)
      const isClickable = !props.disabled && (link.isClickable.value || props.link)

      return (
        <Tag
          class={[
            'v-list-item',
            {
              'v-list-item--active': isActive.value,
              'v-list-item--disabled': props.disabled,
              'v-list-item--link': isClickable,
              [`${props.activeClass}`]: isActive.value && props.activeClass,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            variantClasses.value,
          ]}
          style={[
            colorStyles.value,
            dimensionStyles.value,
          ]}
          href={ link.href.value }
          tabindex={ isClickable ? 0 : undefined }
          onClick={ isClickable && link.navigate }
          v-ripple={ isClickable }
        >
          { genOverlays(!!(isClickable || isActive.value), 'v-list-item') }

          { hasPrepend && (
            slots.prepend
              ? slots.prepend()
              : (
                <VListItemAvatar left>
                  <VAvatar
                    density={ props.density }
                    icon={ props.prependIcon }
                    image={ props.prependAvatar }
                  />
                </VListItemAvatar>
              )
          ) }

          { hasHeader && (
            <VListItemHeader>
              { hasTitle && (
                <VListItemTitle>
                  { slots.title
                    ? slots.title()
                    : props.title
                  }
                </VListItemTitle>
              ) }

              { hasSubtitle && (
                <VListItemSubtitle>
                  { slots.subtitle
                    ? slots.subtitle()
                    : props.subtitle
                  }
                </VListItemSubtitle>
              ) }
            </VListItemHeader>
          ) }

          { slots.default?.() }

          { hasAppend && (
            slots.append
              ? slots.append()
              : (
                <VListItemAvatar right>
                  <VAvatar
                    density={ props.density }
                    icon={ props.appendIcon }
                    image={ props.appendAvatar }
                  />
                </VListItemAvatar>
              )
          ) }
        </Tag>
      )
    }
  },
})
