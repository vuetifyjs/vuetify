// Styles
import './VSpeedDial.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVMenuProps, VMenu } from '@/components/VMenu/VMenu'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useProxiedModel } from '@/composables/proxiedModel'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
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

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')

    const menuRef = ref<VMenu>()

    const location = computed<Anchor>(() => {
      const [y, x = 'center'] = props.location?.split(' ') ?? []

      return `${y} ${x}` as Anchor
    })

    const locationClasses = computed(() => ({
      [`v-speed-dial__content--${location.value.replace(' ', '-')}`]: true,
    }))

    useRender(() => {
      const menuProps = VMenu.filterProps(props)

      return (
        <VMenu
          { ...menuProps }
          v-model={ model.value }
          class={ props.class }
          style={ props.style }
          contentClass={[
            'v-speed-dial__content',
            locationClasses.value,
            props.contentClass,
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
