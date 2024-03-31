// Styles
import './VMenu.sass'

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
import { computed, inject, mergeProps, nextTick, provide, ref, shallowRef, watch } from 'vue'
import { VMenuSymbol } from './shared'
import {
  focusableChildren,
  focusChild,
  genericComponent,
  getNextElement,
  getUid,
  isClickInsideElement,
  omit,
  propsFactory,
  useRender,
} from '@/util'

// Types
import type { Component } from 'vue'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const makeVMenuProps = propsFactory({
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
    transition: { component: VDialogTransition as Component },
  }), ['absolute']),
}, 'VMenu')

export const VMenu = genericComponent<OverlaySlots>()({
  name: 'VMenu',

  props: makeVMenuProps(),

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
    const openChildren = shallowRef(0)
    provide(VMenuSymbol, {
      register () {
        ++openChildren.value
      },
      unregister () {
        --openChildren.value
      },
      closeParents (e) {
        setTimeout(() => {
          if (!openChildren.value &&
            (e == null || (e && !isClickInsideElement(e, overlay.value!.contentEl!)))
          ) {
            isActive.value = false
            parent?.closeParents()
          }
        }, 40)
      },
    })

    async function onFocusIn (e: FocusEvent) {
      const before = e.relatedTarget as HTMLElement | null
      const after = e.target as HTMLElement | null

      await nextTick()

      if (
        isActive.value &&
        before !== after &&
        overlay.value?.contentEl &&
        // We're the topmost menu
        overlay.value?.globalTop &&
        // It isn't the document or the menu body
        ![document, overlay.value.contentEl].includes(after!) &&
        // It isn't inside the menu body
        !overlay.value.contentEl.contains(after)
      ) {
        const focusable = focusableChildren(overlay.value.contentEl)
        focusable[0]?.focus()
      }
    }

    watch(isActive, val => {
      if (val) {
        parent?.register()
        document.addEventListener('focusin', onFocusIn, { once: true })
      } else {
        parent?.unregister()
        document.removeEventListener('focusin', onFocusIn)
      }
    })

    function onClickOutside (e: MouseEvent) {
      parent?.closeParents(e)
    }

    function onKeydown (e: KeyboardEvent) {
      if (props.disabled) return

      if (e.key === 'Tab') {
        const nextElement = getNextElement(
          focusableChildren(overlay.value?.contentEl as Element, false),
          e.shiftKey ? 'prev' : 'next',
          (el: HTMLElement) => el.tabIndex >= 0
        )
        if (!nextElement) {
          isActive.value = false
          overlay.value?.activatorEl?.focus()
        }
      } else if (['Enter', ' '].includes(e.key) && props.closeOnContentClick) {
        isActive.value = false
        parent?.closeParents()
      }
    }

    function onActivatorKeydown (e: KeyboardEvent) {
      if (props.disabled) return

      const el = overlay.value?.contentEl
      if (el && isActive.value) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          focusChild(el, 'next')
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          focusChild(el, 'prev')
        }
      } else if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
        isActive.value = true
        e.preventDefault()
        setTimeout(() => setTimeout(() => onActivatorKeydown(e)))
      }
    }

    const activatorProps = computed(() =>
      mergeProps({
        'aria-haspopup': 'menu',
        'aria-expanded': String(isActive.value),
        'aria-owns': id.value,
        onKeydown: onActivatorKeydown,
      }, props.activatorProps)
    )

    useRender(() => {
      const overlayProps = VOverlay.filterProps(props)

      return (
        <VOverlay
          ref={ overlay }
          id={ id.value }
          class={[
            'v-menu',
            props.class,
          ]}
          style={ props.style }
          { ...overlayProps }
          v-model={ isActive.value }
          absolute
          activatorProps={ activatorProps.value }
          onClick:outside={ onClickOutside }
          onKeydown={ onKeydown }
          { ...scopeId }
        >
          {{
            activator: slots.activator,
            default: (...args) => (
              <VDefaultsProvider root="VMenu">
                { slots.default?.(...args) }
              </VDefaultsProvider>
            ),
          }}
        </VOverlay>
      )
    })

    return forwardRefs({ id, ΨopenChildren: openChildren }, overlay)
  },
})

export type VMenu = InstanceType<typeof VMenu>
