// Styles
import './VOverlay.sass'

import {
  computed,
  defineComponent,
  ref,
  Teleport,
  Transition,
  watch,
} from 'vue'
import makeProps from '@/util/makeProps'
import { useProxiedModel } from '@/composables/proxiedModel'
import { provideTheme } from '@/composables/theme'

import type {
  Ref,
  FunctionalComponent,
  Prop,
  PropType,
  TransitionProps,
} from 'vue'
import { useBackgroundColor } from '@/composables/color'

function useTeleport (target = document.body) {
  if (!useTeleport.cache.has(target)) {
    const el = document.createElement('div')
    el.className = 'v-overlay-container'
    target.appendChild(el)
    useTeleport.cache.set(target, el)
  }

  return { teleportTarget: useTeleport.cache.get(target) }
}
useTeleport.cache = new WeakMap<HTMLElement, HTMLElement>()

function useBooted (isActive: Ref<boolean>) {
  const isBooted = ref(false)

  const unwatch = watch(isActive, val => {
    if (val) {
      unwatch()
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

interface MaybeTransitionProps extends Omit<TransitionProps, 'name'> {
  name?: string | boolean
}

const MaybeTransition: FunctionalComponent<MaybeTransitionProps> = (props, { slots }) => {
  if (!props.name) return slots.default?.()

  const { name, ...rest } = props
  return <Transition name={ name as string } { ...rest }>{ slots.default?.() }</Transition>
}

export default defineComponent({
  name: 'VOverlay',

  inheritAttrs: false,

  props: makeProps({
    absolute: Boolean,
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
    target: [],
    transition: {
      type: [String, Boolean],
      default: 'fade-transition',
    },
  }),

  setup (props, { slots, attrs }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { teleportTarget } = useTeleport()
    const { themeClasses } = provideTheme()
    const { isBooted } = useBooted(isActive)
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null
    }))

    function onScrimClick () {
      if (!props.persistent) isActive.value = false
    }

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
        <Teleport to={ teleportTarget }>
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
              {...attrs}
            >
              <Transition name="fade-transition" appear>
                { isActive.value && props.scrim && (
                  <div
                    class={[
                      'v-overlay__scrim',
                      scrimColor.backgroundColorClasses.value,
                    ]}
                    style={ scrimColor.backgroundColorStyles.value }
                    onClick={ onScrimClick }
                  />
                )}
              </Transition>
              <MaybeTransition name={ props.transition } appear>
                { isActive.value && <div class="v-overlay__content">{ slots.default?.() }</div> }
              </MaybeTransition>
            </div>
          )}
        </Teleport>
      </>
    )
  },
})
