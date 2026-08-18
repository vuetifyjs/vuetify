// Styles
import './VMenu.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VOverlay } from '@/components/VOverlay'
import { makeVOverlayProps } from '@/components/VOverlay/VOverlay'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'

// Utilities
import {
  computed,
  inject,
  mergeProps,
  onBeforeUnmount,
  onDeactivated,
  provide,
  ref,
  shallowRef, toRef,
  useId,
  watch,
} from 'vue'
import { VMenuSymbol } from './shared'
import {
  focusableChildren,
  focusChild,
  genericComponent,
  getActiveElement,
  getNextElement,
  omit,
  propsFactory,
  useRender,
} from '@/util'

// Types
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const makeVMenuProps = propsFactory({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  openOnArrow: {
    type: Boolean,
    default: true,
  },

  ...omit(makeVOverlayProps({
    captureFocus: true,
    closeDelay: 250,
    closeOnContentClick: true,
    locationStrategy: 'connected' as const,
    location: undefined,
    openDelay: 300,
    scrim: false,
    scrollStrategy: 'reposition' as const,
    transition: { component: VDialogTransition },
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
    const { isRtl } = useRtl()

    const uid = useId()
    const id = toRef(() => props.id || `v-menu-${uid}`)

    const overlay = ref<VOverlay>()

    const parent = inject(VMenuSymbol, null)
    const openChildren = shallowRef(new Map<string, () => void>())
    provide(VMenuSymbol, {
      register (childUid, close) {
        // Only one submenu open per level: close any already-open sibling first.
        for (const [otherUid, closeOther] of [...openChildren.value]) {
          if (otherUid !== childUid) closeOther()
        }
        openChildren.value.set(childUid, close)
      },
      unregister (childUid) {
        openChildren.value.delete(childUid)
      },
      closeParents (e) {
        const clickedOutside = !e || overlay.value?.contentEl?._clickOutside?.lastMousedownWasOutside

        setTimeout(() => {
          if (!openChildren.value.size &&
            !props.persistent &&
            clickedOutside
          ) {
            isActive.value = false
            parent?.closeParents(e)
          }
        }, 40)
      },
      openOnHover: props.openOnHover,
      rootOpenedByHover: props.submenu && parent
        ? parent.rootOpenedByHover
        : () => overlay.value?.openedByHover ?? false,
    })

    onBeforeUnmount(() => parent?.unregister(uid))
    onDeactivated(() => isActive.value = false)

    watch(isActive, val => {
      if (val) {
        parent?.register(uid, () => { isActive.value = false })
      } else {
        parent?.unregister(uid)

        // close a submenu branch
        for (const [, closeChild] of [...openChildren.value]) closeChild()
      }
    }, { immediate: true })

    function onKeydown (e: KeyboardEvent) {
      if (props.disabled) return

      if (e.key === 'Tab') {
        if (props.submenu && !props.retainFocus) {
          e.preventDefault()
          isActive.value = false
          overlay.value?.activatorEl?.focus()
          return
        }
        const nextElement = getNextElement(
          focusableChildren(overlay.value?.contentEl as Element, false),
          e.shiftKey ? 'prev' : 'next',
          (el: HTMLElement) => el.tabIndex >= 0
        )
        if (!nextElement && !props.retainFocus) {
          isActive.value = false
        }
      } else if (props.submenu && e.key === (isRtl.value ? 'ArrowRight' : 'ArrowLeft')) {
        isActive.value = false
        overlay.value?.activatorEl?.focus()
      }
    }

    function onActivatorKeydown (e: KeyboardEvent) {
      if (props.disabled || e.isComposing) return

      const el = overlay.value?.contentEl
      if (el && isActive.value) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          if (!props.openOnArrow) return
          e.preventDefault()
          e.stopImmediatePropagation()
          focusChild(el, e.key === 'ArrowDown' ? 'next' : 'prev')
        } else if (props.submenu) {
          if (e.key === (isRtl.value ? 'ArrowRight' : 'ArrowLeft')) {
            isActive.value = false
            overlay.value?.activatorEl?.focus()
          } else if (e.key === (isRtl.value ? 'ArrowLeft' : 'ArrowRight')) {
            e.preventDefault()
            focusChild(el, 'first')
          }
        }
      } else if (
        props.submenu
          ? e.key === (isRtl.value ? 'ArrowLeft' : 'ArrowRight')
          : props.openOnArrow && ['ArrowDown', 'ArrowUp'].includes(e.key)
      ) {
        isActive.value = true
        e.preventDefault()
        focusContentWhenReady(e)
      }
    }

    function focusContentWhenReady (e: KeyboardEvent, attempt = 1) {
      if (!isActive.value) return
      const el = overlay.value?.contentEl
      if (el?.contains(getActiveElement())) return
      if (el && focusableChildren(el).length) {
        onActivatorKeydown(e)
        if (el.contains(getActiveElement())) return
      }
      if (attempt <= 10) {
        requestAnimationFrame(() => focusContentWhenReady(e, attempt + 1))
      }
    }

    const activatorProps = computed(() =>
      mergeProps({
        'aria-haspopup': 'menu',
        'aria-expanded': String(isActive.value),
        'aria-controls': id.value,
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
          _submenu={ props.submenu }
          activatorProps={ activatorProps.value }
          location={ props.location ?? (props.submenu ? 'end' : 'bottom') }
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
