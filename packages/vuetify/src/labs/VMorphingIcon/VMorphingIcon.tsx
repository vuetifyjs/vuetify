// Styles
import './VMorphingIcon.scss'

// Components
import { makeVIconProps, VIcon } from '@/components/VIcon/VIcon'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'
import { provideTheme } from '@/composables/theme'

// Utilities
import { Transition } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

export const makeVMorphingIconProps = propsFactory({
  dark: Boolean,

  ...makeComponentProps(),
  ...makeVIconProps(),
  ...makeTagProps({ tag: 'div' }),
}, 'VMorphingIcon')

export const VMorphingIcon = genericComponent()({
  name: 'VMorphingIcon',

  props: makeVMorphingIconProps(),

  setup (props, { slots }) {
    const { themeClasses, current } = provideTheme(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)

    useRender(() => {
      const iconProps = omit(VIcon.filterProps(props), ['color'])
      const isDark = props.dark ?? current.value.dark

      return (
        <props.tag
          class={[
            'v-morphing-icon',
            `v-morphing-icon--on-${isDark ? 'dark' : 'light'}`,
            themeClasses.value,
            textColorClasses.value,
            props.class,
          ]}
          style={[
            textColorStyles.value,
            props.style,
          ]}
        >
          <div class="v-morphing-icon__underlay" />
          <div class="v-morphing-icon__content">
            <div class="v-morphing-icon__stack">
              <Transition name="morphing-transition">
                <VIcon
                  key={ String(props.icon) }
                  icon={ props.icon }
                  { ...iconProps }
                  v-slot:default={ slots.default }
                />
              </Transition>
            </div>
          </div>
        </props.tag>
      )
    })

    return {}
  },
})

export type VMorphingIcon = InstanceType<typeof VMorphingIcon>
