// Styles
import './VMenu.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VOverlay } from '@/components/VOverlay'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'

// Utilities
import { computed, inject, mergeProps, provide, ref, watch } from 'vue'
import { genericComponent, getUid, omit, useRender } from '@/util'
import { filterVOverlayProps, makeVOverlayProps } from '@/components/VOverlay/VOverlay'
import { VMenuSymbol } from './shared'

// Types
import type { SlotsToProps } from '@/util'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const VMenu = genericComponent<new () => {
  $props: SlotsToProps<OverlaySlots>
}>()({
  name: 'VMenu',

  props: {
    // TODO
    // disableKeys: Boolean,
    id: String,

    ...omit(makeVOverlayProps({
      closeDelay: 250,
      closeOnContentClick: true,
      locationStrategy: 'connected' as const,
      openDelay: 300,
      scrim: false,
      scrollStrategy: 'reposition' as const,
      transition: { component: VDialogTransition },
    }), ['absolute']),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
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

    useRender(() => {
      const [overlayProps] = filterVOverlayProps(props)

      return (
        <VOverlay
          ref={ overlay }
          class={[
            'v-menu',
          ]}
          { ...overlayProps }
          v-model={ isActive.value }
          absolute
          activatorProps={ mergeProps({
            'aria-haspopup': 'menu',
            'aria-expanded': String(isActive.value),
            'aria-owns': id.value,
          }, props.activatorProps) }
          onClick:outside={ onClickOutside }
          { ...scopeId }
        >
          {{
            activator: slots.activator,
            default: (...args) => (
              <VDefaultsProvider root>
                { slots.default?.(...args) }
              </VDefaultsProvider>
            ),
          }}
        </VOverlay>
      )
    })

    return forwardRefs({ id }, overlay)
  },
})

export type VMenu = InstanceType<typeof VMenu>
