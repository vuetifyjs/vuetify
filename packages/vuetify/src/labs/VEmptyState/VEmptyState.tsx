// Styles
import './VEmptyState.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { makeSizeProps } from '@/composables/size'
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { IconValue } from '@/composables/icons'

// Utility
import { genericComponent, propsFactory, useRender } from '@/util'
import { useBackgroundColor } from '@/composables/color'
import { toRef } from 'vue'

// Types

export type VEmptyStateSlots = {
  default: void
  media: void
}

export const makeVEmptyStateProps = propsFactory({
  avatar: String,
  color: String,
  icon: IconValue,
  title: String,
  subtitle: String,
  text: String,

  ...makeComponentProps(),
  ...makeSizeProps({ size: '25%' }),
  ...makeThemeProps(),
}, 'VEmptyState')

export const VEmptyState = genericComponent<VEmptyStateSlots>()({
  name: 'VEmptyState',

  props: makeVEmptyStateProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))

    useRender(() => (
      <div
        class={[
          'v-empty-state',
          themeClasses.value,
          backgroundColorClasses.value,
          props.class,
        ]}
        style={[
          backgroundColorStyles.value,
          props.style,
        ]}
      >
        { !slots.media ? (
          <>
            { props.avatar ? (
              <VAvatar
                key="avatar"
                image={ props.avatar }
                size={ props.size }
                tile
              />
            ) : props.icon ? (
              <VIcon
                key="icon"
                size={ props.size }
                icon={ props.icon }
              />
            ) : undefined }
          </>
        ) : (
          <VDefaultsProvider
            key="media-defaults"
            defaults={{
              VAvatar: {
                image: props.avatar,
                icon: props.icon,
              },
            }}
          >
            { slots.media() }
          </VDefaultsProvider>
        )}


        { props.title && (
          <div key="title" class="v-empty-state__title">
            { props.title }
          </div>
        )}

        { props.subtitle && (
          <div key="subtitle" class="v-empty-state__subtitle">
            { props.subtitle }
          </div>
        )}

        { props.text && (
          <div key="text" class="v-empty-state__text">
            { props.text }
          </div>
        )}

        { slots.default && (
          <div key="content" class="v-empty-state__content">
            { slots.default() }
          </div>
        )}
      </div>
    ))

    return {}
  },
})

export type VEmptyState = InstanceType<typeof VEmptyState>
