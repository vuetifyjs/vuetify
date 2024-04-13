// Styles
import './VSpeedDial.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVMenuProps, VMenu } from '@/components/VMenu/VMenu'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const makeVSpeedDialProps = propsFactory({
  ...makeComponentProps(),
  ...makeVMenuProps({ offset: 8, minWidth: 0, location: 'top center' as const }),
  ...makeTransitionProps({ transition: 'fade-transition' }),
}, 'VSpeedDial')

export const VSpeedDial = genericComponent<OverlaySlots>()({
  name: 'VSpeedDial',

  props: makeVSpeedDialProps(),

  setup (props, { slots }) {
    const menuRef = ref<VMenu>()

    useRender(() => {
      const menuProps = VMenu.filterProps(props)

      return (
        <VMenu
          { ...menuProps }
          class={ props.class }
          style={ props.style }
          contentClass="v-speed-dial__content"
          ref={ menuRef }
        >
          {{
            ...slots,
            default: slotProps => (
              <VDefaultsProvider
                defaults={{
                  VBtn: {
                    size: 'small',
                  },
                }}
              >
                <MaybeTransition
                  appear
                  group
                  transition={ props.transition }
                >
                  { slots.default?.(slotProps) }
                </MaybeTransition>
              </VDefaultsProvider>
            ),
          }}
        </VMenu>
      )
    })

    return {}
  },
})

export type VSpeedDial = InstanceType<typeof VSpeedDial>
