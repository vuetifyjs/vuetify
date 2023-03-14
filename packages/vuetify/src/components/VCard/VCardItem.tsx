// Components
import { VAvatar } from '../VAvatar'
import { VCardSubtitle } from './VCardSubtitle'
import { VCardTitle } from './VCardTitle'
import { VDefaultsProvider } from '../VDefaultsProvider'

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
      const hasPrepend = !!(props.prependAvatar || props.prependIcon || slots.prepend)
      const hasAppend = !!(props.appendAvatar || props.appendIcon || slots.append)
      const hasTitle = !!(props.title || slots.title)
      const hasSubtitle = !!(props.subtitle || slots.subtitle)

      return (
        <div class="v-card-item">
          { hasPrepend && (
            <VDefaultsProvider
              key="prepend"
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
            >
              <div class="v-card-item__prepend">
                { slots.prepend?.() ?? (<VAvatar />) }
              </div>
            </VDefaultsProvider>
          )}

          <div class="v-card-item__content">
            { hasTitle && (
              <VCardTitle key="title">
                { slots.title?.() ?? props.title }
              </VCardTitle>
            )}

            { hasSubtitle && (
              <VCardSubtitle key="subtitle">
                { slots.subtitle?.() ?? props.subtitle }
              </VCardSubtitle>
            )}

            { slots.default?.() }
          </div>

          { hasAppend && (
            <VDefaultsProvider
              key="append"
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
            >
              <div class="v-card-item__append">
                { slots.append?.() ?? (<VAvatar />) }
              </div>
            </VDefaultsProvider>
          )}
        </div>
      )
    })

    return {}
  },
})

export type VCardItem = InstanceType<typeof VCardItem>
