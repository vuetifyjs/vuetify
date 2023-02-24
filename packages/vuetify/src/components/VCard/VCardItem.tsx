// Components
import { VAvatar } from '@/components/VAvatar'
import { VCardSubtitle } from './VCardSubtitle'
import { VCardTitle } from './VCardTitle'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { IconValue } from '@/composables/icons'
import { makeDensityProps } from '@/composables/density'

// Utility
import { genericComponent, useRender } from '@/util'

// Types
import type { MakeSlots } from '@/util'

export type VCardItemSlots = MakeSlots<{
  default: []
  prepend: []
  append: []
  title: []
  subtitle: []
}>

export const VCardItem = genericComponent<VCardItemSlots>()({
  name: 'VCardItem',

  props: {
    appendAvatar: String,
    appendIcon: IconValue,
    prependAvatar: String,
    prependIcon: IconValue,
    subtitle: String,
    title: String,

    ...makeDensityProps(),
  },

  setup (props, { slots }) {
    useRender(() => {
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon)
      const hasAppend = !!(hasAppendMedia || slots.append)
      const hasTitle = !!(props.title || slots.title)
      const hasSubtitle = !!(props.subtitle || slots.subtitle)

      return (
        <div class="v-card-item">
          { hasPrepend && (
            <div key="prepend" class="v-card-item__prepend">
              { !slots.prepend && (
                <>
                  { props.prependAvatar && (
                    <VAvatar
                      key="prepend-avatar"
                      density={ props.density }
                      image={ props.prependAvatar }
                    />
                  ) }

                  { props.prependIcon && (
                    <VIcon
                      key="prepend-icon"
                      density={ props.density }
                      icon={ props.prependIcon }
                    />
                  ) }
                </>
              ) }

              { slots.prepend && (
                <VDefaultsProvider
                  key="prepend-defaults"
                  disabled={ !hasPrependMedia }
                  defaults={{
                    VAvatar: {
                      density: props.density,
                      icon: props.prependIcon,
                      image: props.prependAvatar,
                    },
                    VIcon: {
                      density: props.density,
                      icon: props.prependIcon,
                    },
                  }}
                  v-slots:default={ slots.prepend }
                />
              ) }
            </div>
          ) }

          <div class="v-card-item__content">
            { hasTitle && (
              <VCardTitle key="title">
                { slots.title?.() ?? props.title}
              </VCardTitle>
            ) }

            { hasSubtitle && (
              <VCardSubtitle key="subtitle">
                { slots.subtitle?.() ?? props.subtitle }
              </VCardSubtitle>
            ) }

            { slots.default?.() }
          </div>

          { hasAppend && (
            <div key="append" class="v-card-item__append">
              { slots.append && (
                <VDefaultsProvider
                  key="append-defaults"
                  disabled={ !hasAppendMedia }
                  defaults={{
                    VAvatar: {
                      density: props.density,
                      icon: props.appendIcon,
                      image: props.appendAvatar,
                    },
                    VIcon: {
                      density: props.density,
                      icon: props.appendIcon,
                    },
                  }}
                  v-slots:default={ slots.append }
                />
              ) }

              { !slots.append && (
                <>
                  { props.appendIcon && (
                    <VIcon
                      key="append-icon"
                      density={ props.density }
                      icon={ props.appendIcon }
                    />
                  ) }

                  { props.appendAvatar && (
                    <VAvatar
                      key="append-avatar"
                      density={ props.density }
                      image={ props.appendAvatar }
                    />
                  ) }
                </>
              ) }
           </div>
          ) }
        </div>
      )
    })

    return {}
  },
})

export type VCardItem = InstanceType<typeof VCardItem>
