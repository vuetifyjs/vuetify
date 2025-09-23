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
import { mergeProps, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { focusableChildren, focusChild, genericComponent, IN_BROWSER, propsFactory, useRender } from '@/util'

// Types
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
    transition: { component: VDialogTransition },
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

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Tab' ||
        !overlay.value?.contentEl ||
        // We're the topmost dialog
        !overlay.value?.globalTop
      ) return

      const focusable = focusableChildren(overlay.value.contentEl)
      if (!focusable.length) return

      e.preventDefault()
      focusChild(overlay.value.contentEl, e.shiftKey ? 'prev' : 'next')
    }

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', onKeydown)
    })

    if (IN_BROWSER) {
      watch(() => isActive.value && props.retainFocus, val => {
        if (val) {
          document.addEventListener('keydown', onKeydown)
        } else {
          document.removeEventListener('keydown', onKeydown)
        }
      }, { immediate: true })
    }

    function onAfterEnter () {
      emit('afterEnter')
      if (
        (props.scrim || props.retainFocus) &&
        overlay.value?.contentEl &&
        !overlay.value.contentEl.contains(document.activeElement)
      ) {
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
          height={ !props.fullscreen ? props.height : undefined }
          width={ !props.fullscreen ? props.width : undefined }
          maxHeight={ !props.fullscreen ? props.maxHeight : undefined }
          maxWidth={ !props.fullscreen ? props.maxWidth : undefined }
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
