// Styles
import './VSpeedDial.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVMenuProps, VMenu } from '@/components/VMenu/VMenu'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVSpeedDialProps = propsFactory({
  ...makeComponentProps(),
  ...makeVMenuProps({ offset: 8, minWidth: 0, location: 'bottom center' as const }),
  ...makeTransitionProps({ transition: 'fade-transition' }),
}, 'VSpeedDial')

export const VSpeedDial = genericComponent()({
  name: 'VSpeedDial',

  props: makeVSpeedDialProps(),

  setup (props, { slots }) {
    useRender(() => {
      const menuProps = VMenu.filterProps(props)

      return (
        <VMenu
          { ...menuProps }
          class={ props.class }
          style={ props.style }
          contentClass="v-speed-dial__content"
        >
          <VDefaultsProvider
            defaults={{
              VBtn: {
                size: 'x-small',
              },
            }}
          >
            <MaybeTransition
              appear
              group
              transition={ props.transition }
            >
              { slots.default?.() }
            </MaybeTransition>
          </VDefaultsProvider>
        </VMenu>
      )
    })

    return {}
  },
})

export type VSpeedDial = InstanceType<typeof VSpeedDial>
