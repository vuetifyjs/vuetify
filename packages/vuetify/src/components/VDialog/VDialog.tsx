// Styles
import './VDialog.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VBtn } from '@/components/VBtn'
import { makeVCardProps, VCard } from '@/components/VCard/VCard'
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
import type { Component, Ref } from 'vue'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export type DialogSlots = OverlaySlots & {
  item: { isActive: Ref<boolean> }
  prepend: { isActive: Ref<boolean> }
  title: { isActive: Ref<boolean> }
  text: { isActive: Ref<boolean> }
  subtitle: { isActive: Ref<boolean> }
  append: { isActive: Ref<boolean> }
  actions: { isActive: Ref<boolean> }
}

export const makeVDialogProps = propsFactory({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: true,
  },
  scrollable: Boolean,

  ...makeVCardProps(),
  ...makeVOverlayProps({
    origin: 'center center' as const,
    scrollStrategy: 'block' as const,
    transition: { component: VDialogTransition as Component },
    zIndex: 2400,
  }),
}, 'VDialog')

export const VDialog = genericComponent<DialogSlots>()({
  name: 'VDialog',

  props: makeVDialogProps(),

  emits: {
    'click:outside': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
    afterLeave: () => true,
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
      if (overlay.value?.contentEl && !overlay.value.contentEl.contains(document.activeElement)) {
        overlay.value.contentEl.focus({ preventScroll: true })
      }
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
        'aria-expanded': String(isActive.value),
      }, props.activatorProps)
      const contentProps = mergeProps({
        tabindex: -1,
      }, props.contentProps)
      const cardProps = VCard.filterProps(props)

      const hasTitle = !!(slots.title || props.title != null)
      const hasText = !!(slots.text || props.text != null)
      const hasSubtitle = !!(slots.subtitle || props.subtitle != null)
      const hasHeader = hasTitle || hasSubtitle
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon)
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon)
      const hasCardItem = hasHeader || hasPrepend || hasAppend || hasText

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
          role="dialog"
          onAfterEnter={ onAfterEnter }
          { ...scopeId }
        >
          {{
            activator: slots.activator,
            default: (...args) => (
              <VDefaultsProvider root="VDialog">
                { hasCardItem && (
                  <VCard
                    { ...cardProps }
                    color={ undefined }
                    key="item"
                  >
                    {{
                      default: slots.item ? () => slots.item?.(...args) : undefined,
                      prepend: slots.prepend ? () => slots.prepend?.(...args) : undefined,
                      title: slots.title ? () => slots.title?.(...args) : undefined,
                      text: slots.text ? () => slots.text?.(...args) : undefined,
                      subtitle: slots.subtitle ? () => slots.subtitle?.(...args) : undefined,
                      append: slots.append ? () => slots.append?.(...args) : undefined,
                      actions: slots.actions ? () => (
                        <VDefaultsProvider
                          defaults={{
                            VBtn: {
                              color: props.color,
                            },
                          }}
                        >
                          { slots.actions?.(...args) }
                        </VDefaultsProvider>
                      ) : undefined,
                    }}
                  </VCard>
                )}

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
