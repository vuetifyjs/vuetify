// Styles
import './VOverlay.sass'

import {
  computed,
  defineComponent,
  ref,
  Teleport,
  toRef,
  Transition,
  watch,
  watchEffect,
} from 'vue'
import { BackgroundColorData, useBackgroundColor } from '@/composables/color'
import { makeProps } from '@/util/makeProps'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { provideTheme } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTeleport } from '@/composables/teleport'

import type {
  Prop,
  PropType,
  Ref,
} from 'vue'

function useBooted (isActive: Ref<boolean>, eager: Ref<boolean>) {
  const isBooted = ref(eager.value)

  watchEffect(() => {
    if (eager.value || isActive.value) {
      isBooted.value = true
    }
  })

  return { isBooted }
}

// interface Overlay {
//   vm: ComponentInternalInstance
//   isActive: Ref<boolean>
// }
//
// class OverlayManager {
//   private static _instance?: OverlayManager
//
//   public static get Instance () {
//     return this._instance || (this._instance = new this())
//   }
//
//   components: ComponentInternalInstance[] = shallowReactive([])
//   containerElement?: Element
//
//   private constructor () {
//     window.addEventListener('fullscreenchange', this._updateContainerParent)
//     this._createContainer()
//
//     watch(() => this.components.length, val => {
//       if (!val) {
//         this.containerElement?.remove()
//         window.removeEventListener('fullscreenchange', this._updateContainerParent)
//         OverlayManager._instance = undefined
//       }
//     })
//   }
//
//   private _updateContainerParent () {
//     if (this.containerElement) {
//       (document.fullscreenElement || document.body).appendChild(this.containerElement)
//     }
//   }
//
//   private _createContainer () {
//     const el = document.createElement('div')
//     el.className = 'v-overlay-container'
//     this.containerElement = el
//     this._updateContainerParent()
//   }
//
//   static use () {
//     const vm = getCurrentInstance()!
//
//     this.Instance.components.push(vm)
//   }
// }

const positionStrategies = [
  'global', // specific viewport position, usually centered
  'connected', // connected to a certain element
  'flexible', // connected to an element with the ability to overflow or shift if it doesn't fit in the screen
] as const

const scrollStrategies = [
  'close',
  'block',
  'reposition',
] as const

interface ScrimProps {
  modelValue: boolean
  color: BackgroundColorData
  [ley: string]: unknown
}
function Scrim (props: ScrimProps) {
  const { modelValue, color, ...rest } = props
  return (
    <Transition name="fade-transition" appear>
      { props.modelValue && (
        <div
          class={[
            'v-overlay__scrim',
            props.color.backgroundColorClasses.value,
          ]}
          style={ props.color.backgroundColorStyles.value }
          { ...rest }
        />
      )}
    </Transition>
  )
}

function getScrollParent (el?: HTMLElement) {
  do {
    if (hasScrollbar(el)) return el
  } while (el = el?.parentElement!) // eslint-disable-line no-cond-assign

  return document.scrollingElement as HTMLElement
}

function hasScrollbar (el?: HTMLElement) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

  const style = window.getComputedStyle(el)
  return ['auto', 'scroll'].includes(style.overflowY!) && el.scrollHeight > el.clientHeight
}

export default defineComponent({
  name: 'VOverlay',

  inheritAttrs: false,

  props: makeProps({
    absolute: Boolean,
    attach: {
      type: [Boolean, String, Element] as PropType<boolean | string | Element>,
      default: 'body',
    },
    eager: Boolean,
    persistent: Boolean,
    modelValue: Boolean,
    positionStrategy: {
      type: String as PropType<typeof positionStrategies[number]>,
      default: 'global',
      validator: (val: any) => positionStrategies.includes(val),
    },
    scrollStrategy: {
      type: String as PropType<typeof scrollStrategies[number]>,
      default: 'block',
      validator: (val: any) => scrollStrategies.includes(val),
    },
    origin: [String, Object] as Prop<string | Element>,
    scrim: {
      type: [String, Boolean],
      default: true,
    },
    ...makeTransitionProps(),
  }),

  setup (props, { slots, attrs }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { teleportTarget } = useTeleport(toRef(props, 'attach'))
    const { themeClasses } = provideTheme()
    const { isBooted } = useBooted(isActive, toRef(props, 'eager'))
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null
    }))

    function onScrimClick () {
      if (!props.persistent) isActive.value = false
    }

    function onAfterLeave () {
      if (!props.eager) isBooted.value = false
    }

    const overlayRoot = ref<HTMLElement>()
    const scrollParent = ref<HTMLElement>()
    watch(isActive, val => {
      if (val) scrollParent.value = getScrollParent(overlayRoot.value)
      if (!scrollParent.value) return
      scrollParent.value.style.overflow = val ? 'hidden' : ''
    })

    return () => (
      <>
        { slots.activator?.({
          isActive: isActive.value,
          props: {
            modelValue: isActive.value,
            'onUpdate:modelValue': (val: boolean) => isActive.value = val,
            onClick: () => isActive.value = !isActive.value,
          },
        }) }
        <Teleport to={ teleportTarget.value } disabled={ !teleportTarget.value }>
          { isBooted.value && (
            <div
              class={[
                'v-overlay',
                {
                  'v-overlay--absolute': props.absolute,
                  'v-overlay--active': isActive.value,
                },
                themeClasses.value,
              ]}
              ref={ overlayRoot }
              {...attrs}
            >
              <Scrim
                modelValue={ isActive.value && !!props.scrim }
                color={ scrimColor }
                onClick={ onScrimClick }
              />
              <MaybeTransition transition={ props.transition } appear persisted onAfterLeave={ onAfterLeave }>
                <div class="v-overlay__content" v-show={ isActive.value }>
                  { slots.default?.({ isActive: isActive.value }) }
                </div>
              </MaybeTransition>
            </div>
          )}
        </Teleport>
      </>
    )
  },
})
