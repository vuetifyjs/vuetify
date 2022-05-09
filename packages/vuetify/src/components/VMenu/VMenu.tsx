// Styles
import './VMenu.sass'

// Components
import { VOverlay } from '@/components/VOverlay'
import { VDialogTransition } from '@/components/transitions'

// Composables
import { makeTransitionProps } from '@/composables/transition'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject, provide, ref, watch } from 'vue'
import { genericComponent, getUid, useRender } from '@/util'
import { VMenuSymbol } from './shared'

// Types
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'
import { useForwardRef } from '@/composables/forwardRef'

export const VMenu = genericComponent<new () => {
  $slots: OverlaySlots
}>()({
  name: 'VMenu',

  inheritAttrs: false,

  props: {
    // TODO
    // disableKeys: Boolean,
    modelValue: Boolean,
    id: String,

    ...makeTransitionProps({
      transition: { component: VDialogTransition },
    } as const),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')

    const uid = getUid()
    const id = computed(() => props.id || `v-menu-${uid}`)

    const overlay = ref<VOverlay>()

    const parent = inject(VMenuSymbol, null)
    let openChildren = 0
    provide(VMenuSymbol, {
      register () {
        ++openChildren
      },
      unregister () {
        --openChildren
      },
      closeParents () {
        setTimeout(() => {
          if (!openChildren) {
            isActive.value = false
            parent?.closeParents()
          }
        }, 40)
      },
    })

    watch(isActive, val => {
      val ? parent?.register() : parent?.unregister()
    })

    function onClickOutside () {
      parent?.closeParents()
    }

    useRender(() => (
      <VOverlay
        ref={ overlay }
        v-model={ isActive.value }
        class={[
          'v-menu',
        ]}
        transition={ props.transition }
        absolute
        closeOnContentClick
        positionStrategy="connected"
        scrollStrategy="reposition"
        scrim={ false }
        openDelay="300"
        closeDelay="250"
        activatorProps={{
          'aria-haspopup': 'menu',
          'aria-expanded': String(isActive.value),
          'aria-owns': id.value,
        }}
        onClick:outside={ onClickOutside }
        { ...attrs }
        v-slots={{
          default: slots.default,
          activator: slots.activator,
        }}
      />
    ))

    return useForwardRef({ id }, overlay)
  },
})

export type VMenu = InstanceType<typeof VMenu>
