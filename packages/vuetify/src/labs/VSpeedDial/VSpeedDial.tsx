// Styles
import './VSpeedDial.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVMenuProps, VMenu } from '@/components/VMenu/VMenu'

// Composables
import { makeComponentProps } from '@/composables/component'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { ComputedRef } from 'vue'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'
import type { Anchor } from '@/util'

export const makeVSpeedDialProps = propsFactory({
  ...makeComponentProps(),
  ...makeVMenuProps({
    offset: 8,
    minWidth: 0,
    openDelay: 0,
    closeDelay: 100,
    location: 'top center' as const,
    transition: 'scale-transition',
  }),
}, 'VSpeedDial')

export const VSpeedDial = genericComponent<OverlaySlots>()({
  name: 'VSpeedDial',

  props: makeVSpeedDialProps(),

  setup (props, { slots }) {
    const menuRef = ref<VMenu>()

    const location = computed(() => {
      const [y, x = 'center'] = props.location.split(' ')

      return `${y} ${x}`
    }) as ComputedRef<Anchor>

    const locationClasses = computed(() => ({
      [`v-speed-dial__content--${location.value.replace(' ', '-')}`]: true,
    }))

    useRender(() => {
      const menuProps = VMenu.filterProps(props)

      return (
        <VMenu
          { ...menuProps }
          class={ props.class }
          style={ props.style }
          contentClass={[
            'v-speed-dial__content',
            locationClasses.value,
          ]}
          location={ location.value }
          ref={ menuRef }
          transition="fade-transition"
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
                  mode="out-in"
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
