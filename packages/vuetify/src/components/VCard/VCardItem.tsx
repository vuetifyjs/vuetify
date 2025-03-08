// Components
import { useCardAvatar } from './CardAvatar'
import { useCardIcon } from './CardIcon'
import { VCardSubtitle } from './VCardSubtitle'
import { VCardTitle } from './VCardTitle'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { IconValue } from '@/composables/icons'

// Utilities
import { EventProp, genericComponent, propsFactory, useRender } from '@/util'

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
  subtitle: [String, Number],
  title: [String, Number],

  'onClick:append': EventProp<[MouseEvent]>(),
  'onClick:prepend': EventProp<[MouseEvent]>(),

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
      const { CardAvatar } = useCardAvatar(props)
      const { CardIcon } = useCardIcon(props)

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
                    <CardAvatar
                      key="prepend-avatar"
                      name="prepend"
                    />
                  )}

                  { props.prependIcon && (
                    <CardIcon
                      key="prepend-icon"
                      name="prepend"
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
                <>
                  { props.appendIcon && (
                    <CardIcon
                      key="append-icon"
                      name="append"
                    />
                  )}

                  { props.appendAvatar && (
                    <CardAvatar
                      key="append-avatar"
                      name="append"
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
