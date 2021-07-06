// Styles
import './VCard.sass'

// Components
import VCardActions from './VCardActions'
import VCardAvatar from './VCardAvatar'
import VCardHeader from './VCardHeader'
import VCardHeaderText from './VCardHeaderText'
import VCardImg from './VCardImg'
import VCardMedia from './VCardMedia'
import VCardSubtitle from './VCardSubtitle'
import VCardText from './VCardText'
import VCardTitle from './VCardTitle'
import { VAvatar } from '@/components/VAvatar'
import { VImg } from '@/components/VImg'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VCard',

  directives: { Ripple },

  props: {
    appendAvatar: String,
    appendIcon: String,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: Boolean,
    prependAvatar: String,
    prependIcon: String,
    ripple: Boolean,
    subtitle: String,
    text: String,
    title: String,

    ...makeThemeProps(),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeVariantProps({ variant: 'contained' } as const),
  },

  setup (props, { attrs, slots }) {
    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props, 'v-card')
    const { colorClasses, colorStyles, variantClasses } = useVariant(props, 'v-card')
    const { densityClasses } = useDensity(props, 'v-card')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-card')
    const { roundedClasses } = useRounded(props, 'v-card')
    const link = useLink(props, attrs)

    return () => {
      const Tag = (link.isLink.value) ? 'a' : props.tag
      const hasTitle = !!(slots.title || props.title)
      const hasSubtitle = !!(slots.subtitle || props.subtitle)
      const hasHeaderText = hasTitle || hasSubtitle
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon)
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon)
      const hasImage = !!(slots.image || props.image)
      const hasHeader = hasHeaderText || hasPrepend || hasAppend
      const hasText = !!(slots.text || props.text)
      const isClickable = !props.disabled && (link.isClickable.value || props.link)

      return (
        <Tag
          class={[
            'v-card',
            {
              'v-card--disabled': props.disabled,
              'v-card--flat': props.flat,
              'v-card--hover': props.hover && !(props.disabled || props.flat),
              'v-card--link': isClickable,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
            variantClasses.value,
          ]}
          style={[
            colorStyles.value,
            dimensionStyles.value,
            positionStyles.value,
          ]}
          href={ link.href.value }
          onClick={ isClickable && link.navigate }
          v-ripple={ isClickable }
        >
          { genOverlays(isClickable, 'v-card') }

          { hasImage && (
            <VCardImg>
              { slots.image
                ? slots.image?.({ src: props.image })
                : (<VImg src={ props.image } alt="" />)
              }
            </VCardImg>
          ) }

          { slots.media && (
            <VCardMedia v-slots={{ default: slots.media }} />
          ) }

          { hasHeader && (
            <VCardHeader>
              { hasPrepend && (
                <VCardAvatar>
                  { slots.prepend
                    ? slots.prepend()
                    : (
                      <VAvatar
                        density={ props.density }
                        icon={ props.prependIcon }
                        image={ props.prependAvatar }
                      />
                    )
                  }
                </VCardAvatar>
              ) }

              { hasHeaderText && (
                <VCardHeaderText>
                  { hasTitle && (
                    <VCardTitle>
                      { slots.title
                        ? slots.title()
                        : props.title
                      }
                    </VCardTitle>
                  ) }

                  <VCardSubtitle>
                    { slots.subtitle
                      ? slots.subtitle()
                      : props.subtitle
                    }
                  </VCardSubtitle>
                </VCardHeaderText>
              ) }

              { hasAppend && (
                <VCardAvatar>
                  { slots.append
                    ? slots.append()
                    : (
                      <VAvatar
                        density={ props.density }
                        icon={ props.appendIcon }
                        image={ props.appendAvatar }
                      />
                    )
                  }
                </VCardAvatar>
              ) }
            </VCardHeader>
          ) }

          { hasText && (
            <VCardText>
              { slots.text ? slots.text() : props.text }
            </VCardText>
          ) }

          { slots.default?.() }

          { slots.actions && (
            <VCardActions v-slots={{ default: slots.actions }} />
          ) }
        </Tag>
      )
    }
  },
})
