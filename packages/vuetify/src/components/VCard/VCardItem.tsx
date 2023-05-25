// Components
import { VCardSubtitle } from './VCardSubtitle'
import { VCardTitle } from './VCardTitle'
import { VAvatar } from '@/components/VAvatar'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { IconValue } from '@/composables/icons'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export type VCardItemSlots = {
  default: never
  prepend: never
  append: never
  title: never
  subtitle: never
}

export const makeCardItemProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  prependAvatar: String,
  prependIcon: IconValue,
  subtitle: String,
  title: String,

  ...makeComponentProps(),
  ...makeDensityProps(),
}, 'v-card-item')

export const VCardItem = genericComponent<VCardItemSlots>()({
  name: 'VCardItem',

  props: makeCardItemProps(),

  setup (props, { slots }) {
    useRender(() => {
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon)
      const hasAppend = !!(hasAppendMedia || slots.append)
      const hasTitle = !!(props.title || slots.title)
      const hasSubtitle = !!(props.subtitle || slots.subtitle)

      return (
        <div
          class={[
            'v-card-item',
            props.class,
          ]}
          style={ props.style }
        >
          { hasPrepend && (
            <div key="prepend" class="v-card-item__prepend">
              { !slots.prepend ? (
                hasPrependMedia && (
                  <VAvatar
                    key="prepend-avatar"
                    density={ props.density }
                    icon={ props.prependIcon }
                    image={ props.prependAvatar }
                  />
                )
              ) : (
                <VDefaultsProvider
                  key="prepend-defaults"
                  disabled={ !hasPrependMedia }
                  defaults={{
                    VAvatar: {
                      density: props.density,
                      icon: props.prependIcon,
                      image: props.prependAvatar,
                    },
                  }}
                  v-slots:default={ slots.prepend }
                />
              )}
            </div>
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
            <div key="append" class="v-card-item__append">
              { !slots.append ? (
                hasAppendMedia && (
                  <VAvatar
                    key="append-avatar"
                    density={ props.density }
                    icon={ props.appendIcon }
                    image={ props.appendAvatar }
                  />
                )
              ) : (
                <VDefaultsProvider
                  key="append-defaults"
                  disabled={ !hasAppendMedia }
                  defaults={{
                    VAvatar: {
                      density: props.density,
                      icon: props.appendIcon,
                      image: props.appendAvatar,
                    },
                  }}
                  v-slots:default={ slots.append }
                />
              )}
           </div>
          )}
        </div>
      )
    })

    return {}
  },
})

export type VCardItem = InstanceType<typeof VCardItem>
