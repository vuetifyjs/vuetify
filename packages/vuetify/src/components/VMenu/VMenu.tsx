// Styles
import './VMenu.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VOverlay } from '@/components/VOverlay'

// Composables
import { makeTransitionProps } from '@/composables/transition'
import { useForwardRef } from '@/composables/forwardRef'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'

// Utilities
import { computed, inject, provide, ref, watch } from 'vue'
import { genericComponent, getUid, useRender } from '@/util'
import { VMenuSymbol } from './shared'

// Types
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

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
    const { scopeId } = useScopeId()

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
        locationStrategy="connected"
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
        { ...scopeId }
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
