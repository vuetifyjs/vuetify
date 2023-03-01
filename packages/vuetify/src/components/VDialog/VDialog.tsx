// Styles
import './VDialog.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VOverlay } from '@/components/VOverlay'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'
import { forwardRefs } from '@/composables/forwardRefs'

// Utilities
import { computed, mergeProps, nextTick, ref, watch } from 'vue'
import { genericComponent, IN_BROWSER, useRender } from '@/util'
import { filterVOverlayProps, makeVOverlayProps } from '@/components/VOverlay/VOverlay'

// Types
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const VDialog = genericComponent<OverlaySlots>()({
  name: 'VDialog',

  props: {
    fullscreen: Boolean,
    retainFocus: {
      type: Boolean,
      default: true,
    },
    scrollable: Boolean,

    ...makeVOverlayProps({
      origin: 'center center' as const,
      scrollStrategy: 'block' as const,
      transition: { component: VDialogTransition },
      zIndex: 2400,
    }),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { scopeId } = useScopeId()

    const overlay = ref<VOverlay>()
    function onFocusin (e: FocusEvent) {
      const before = e.relatedTarget as HTMLElement | null
      const after = e.target as HTMLElement | null

      if (
        before !== after &&
        overlay.value?.contentEl &&
        // We're the topmost dialog
        overlay.value?.globalTop &&
        // It isn't the document or the dialog body
        ![document, overlay.value.contentEl].includes(after!) &&
        // It isn't inside the dialog body
        !overlay.value.contentEl.contains(after)
      ) {
        const focusable = [...overlay.value.contentEl.querySelectorAll(
          'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
        )].filter(el => !el.hasAttribute('disabled') && !el.matches('[tabindex="-1"]')) as HTMLElement[]

        if (!focusable.length) return

        const firstElement = focusable[0]
        const lastElement = focusable[focusable.length - 1]

        if (before === firstElement) {
          lastElement.focus()
        } else {
          firstElement.focus()
        }
      }
    }

    if (IN_BROWSER) {
      watch(() => isActive.value && props.retainFocus, val => {
        val
          ? document.addEventListener('focusin', onFocusin)
          : document.removeEventListener('focusin', onFocusin)
      }, { immediate: true })
    }

    watch(isActive, async val => {
      await nextTick()
      if (val) {
        overlay.value!.contentEl?.focus({ preventScroll: true })
      } else {
        overlay.value!.activatorEl?.focus({ preventScroll: true })
      }
    })

    const activatorProps = computed(() =>
      mergeProps({
        'aria-haspopup': 'dialog',
        'aria-expanded': String(isActive.value),
      }, props.activatorProps)
    )

    useRender(() => {
      const [overlayProps] = filterVOverlayProps(props)

      return (
        <VOverlay
          ref={ overlay }
          class={[
            'v-dialog',
            {
              'v-dialog--fullscreen': props.fullscreen,
              'v-dialog--scrollable': props.scrollable,
            },
          ]}
          { ...overlayProps }
          v-model={ isActive.value }
          aria-role="dialog"
          aria-modal="true"
          activatorProps={ activatorProps.value }
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

    return forwardRefs({}, overlay)
  },
})

export type VDialog = InstanceType<typeof VDialog>
