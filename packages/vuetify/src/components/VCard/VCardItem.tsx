// Components
import { VAvatar } from '@/components/VAvatar'
import { VCardSubtitle } from './VCardSubtitle'
import { VCardTitle } from './VCardTitle'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

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

  emits: {
    click: (e: MouseEvent | KeyboardEvent) => true,
    'click:prepend': (e: MouseEvent | KeyboardEvent) => true,
    'click:append': (e: MouseEvent | KeyboardEvent) => true,
  },

  setup (props, { slots, emit }) {
    function onClick (e: MouseEvent) {
      emit('click', e)
    }

    function onPrependClick (e: MouseEvent) {
      e.stopImmediatePropagation()
      emit('click:prepend', e)
    }

    function onAppendClick (e: MouseEvent) {
      e.stopImmediatePropagation()
      emit('click:append', e)
    }

    useRender(() => {
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon)
      const hasAppend = !!(hasAppendMedia || slots.append)
      const hasTitle = !!(props.title || slots.title)
      const hasSubtitle = !!(props.subtitle || slots.subtitle)

      return (
        <div class="v-card-item" onClick={ onClick }>
          { hasPrepend && (
            <div key="prepend" class="v-card-item__prepend" onClick={ onPrependClick }>
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
            <div key="append" class="v-card-item__append" onClick={ onAppendClick }>
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
