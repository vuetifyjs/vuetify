// Styles
import './VDialog.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VOverlay } from '@/components/VOverlay'
import { makeVOverlayProps } from '@/components/VOverlay/VOverlay'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'

// Utilities
import { mergeProps, nextTick, ref, watch } from 'vue'
import { focusableChildren, genericComponent, IN_BROWSER, propsFactory, useRender } from '@/util'

// Types
import type { Component } from 'vue'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const makeVDialogProps = propsFactory({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: true,
  },
  scrollable: Boolean,

  ...makeVOverlayProps({
    origin: 'center center' as const,
    scrollStrategy: 'block' as const,
    transition: { component: VDialogTransition as Component },
    zIndex: 2400,
  }),
}, 'VDialog')

export const VDialog = genericComponent<OverlaySlots>()({
  name: 'VDialog',

  props: makeVDialogProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
    afterEnter: () => true,
    afterLeave: () => true,
  },

  setup (props, { emit, slots }) {
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
        const focusable = focusableChildren(overlay.value.contentEl)

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

    function onAfterEnter () {
      emit('afterEnter')
      if (overlay.value?.contentEl && !overlay.value.contentEl.contains(document.activeElement)) {
        overlay.value.contentEl.focus({ preventScroll: true })
      }
    }

    function onAfterLeave () {
      emit('afterLeave')
    }

    watch(isActive, async val => {
      if (!val) {
        await nextTick()
        overlay.value!.activatorEl?.focus({ preventScroll: true })
      }
    })

    useRender(() => {
      const overlayProps = VOverlay.filterProps(props)
      const activatorProps = mergeProps({
        'aria-haspopup': 'dialog',
      }, props.activatorProps)
      const contentProps = mergeProps({
        tabindex: -1,
      }, props.contentProps)

      return (
        <VOverlay
          ref={ overlay }
          class={[
            'v-dialog',
            {
              'v-dialog--fullscreen': props.fullscreen,
              'v-dialog--scrollable': props.scrollable,
            },
            props.class,
          ]}
          style={ props.style }
          { ...overlayProps }
          v-model={ isActive.value }
          aria-modal="true"
          activatorProps={ activatorProps }
          contentProps={ contentProps }
          maxHeight={ props.fullscreen ? undefined : props.maxHeight }
          maxWidth={ props.fullscreen ? undefined : props.maxWidth }
          role="dialog"
          onAfterEnter={ onAfterEnter }
          onAfterLeave={ onAfterLeave }
          { ...scopeId }
        >
          {{
            activator: slots.activator,
            default: (...args) => (
              <VDefaultsProvider root="VDialog">
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
