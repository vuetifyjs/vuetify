// Components
import { VCardSubtitle } from './VCardSubtitle'
import { VCardTitle } from './VCardTitle'
import { VAvatar } from '@/components/VAvatar'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { IconValue } from '@/composables/icons'

// Utilities
import { toDisplayString } from 'vue'
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
  subtitle: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  title: {
    type: [String, Number, Boolean],
    default: undefined,
  },

  ...makeComponentProps(),
  ...makeDensityProps(),
}, 'VCardItem')

export const VCardItem = genericComponent<VCardItemSlots>()({
  name: 'VCardItem',

  props: makeCardItemProps(),

  setup (props, { slots }) {
    useRender(() => {
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon)
      const hasAppend = !!(hasAppendMedia || slots.append)
      const hasTitle = !!(props.title != null || slots.title)
      const hasSubtitle = !!(props.subtitle != null || slots.subtitle)

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
                  }}
                  v-slots:default={ slots.prepend }
                />
              )}
            </div>
          )}

          <div class="v-card-item__content">
            { hasTitle && (
              <VCardTitle key="title">
                { slots.title?.() ?? toDisplayString(props.title) }
              </VCardTitle>
            )}

            { hasSubtitle && (
              <VCardSubtitle key="subtitle">
                { slots.subtitle?.() ?? toDisplayString(props.subtitle) }
              </VCardSubtitle>
            )}

            { slots.default?.() }
          </div>

          { hasAppend && (
            <div key="append" class="v-card-item__append">
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
