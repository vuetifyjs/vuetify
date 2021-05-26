// Styles
import './VOverlay.sass'

import {
  computed,
  defineComponent,
  nextTick,
  ref,
  Teleport,
  toRef,
  Transition,
  watch,
  watchEffect,
} from 'vue'
import type { BackgroundColorData } from '@/composables/color'
import { useBackgroundColor } from '@/composables/color'
import { makeProps } from '@/util/makeProps'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useTheme } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTeleport } from '@/composables/teleport'
import { ClickOutside } from '@/directives/click-outside'

import type { Prop, PropType, Ref } from 'vue'
import { convertToUnit, getScrollParent, standardEasing, useRender } from '@/util'

function useBooted (isActive: Ref<boolean>, eager: Ref<boolean>) {
  const isBooted = ref(eager.value)

  watchEffect(() => {
    if (eager.value || isActive.value) {
      isBooted.value = true
    }
  })

  return { isBooted }
}

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
  [key: string]: unknown
  modelValue: boolean
  color: BackgroundColorData
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

interface ScrollStrategy {
  enable (): void
  disable (): void
}

class CloseScrollStrategy implements ScrollStrategy {
  constructor (
    private isActive: Ref<boolean>
  ) {}

  enable () {
    document.addEventListener('scroll', this.onScroll.bind(this), { passive: true })
  }

  disable () {
    document.removeEventListener('scroll', this.onScroll.bind(this))
  }

  private onScroll () {
    this.isActive.value = false
  }
}

class BlockScrollStrategy implements ScrollStrategy {
  private initialOverflow: string[] = []
  private scrollElements: HTMLElement[] = []
  private content: Ref<HTMLElement | undefined>

  constructor ({ content }: { content: Ref<HTMLElement | undefined> }) {
    this.content = content
  }

  enable () {
    this.scrollElements = [document.documentElement]
    const scrollParent = getScrollParent(this.content.value)
    if (scrollParent !== document.scrollingElement) this.scrollElements.push(scrollParent)

    document.documentElement.style.setProperty(
      '--v-scrollbar-offset',
      convertToUnit(window.innerWidth - document.documentElement.offsetWidth)
    )

    this.scrollElements.forEach((el, i) => {
      this.initialOverflow[i] = el.style.overflowY
      el.style.overflowY = 'hidden'
    })
  }

  disable () {
    this.scrollElements.forEach((el, i) => {
      el.style.overflowY = this.initialOverflow[i]
    })
    document.documentElement.style.setProperty('--v-scrollbar-offset', '')
  }
}

export default defineComponent({
  name: 'VOverlay',

  directives: { ClickOutside },

  inheritAttrs: false,

  props: makeProps({
    absolute: Boolean,
    attach: {
      type: [Boolean, String, Element] as PropType<boolean | string | Element>,
      default: 'body',
    },
    eager: Boolean,
    noClickAnimation: Boolean,
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

  emits: {
    'update:modelValue': (value: boolean) => true,
    'click:outside': (e: MouseEvent) => true,
  },

  setup (props, { slots, attrs, emit }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { teleportTarget } = useTeleport(toRef(props, 'attach'))
    const { themeClasses } = useTheme()
    const { isBooted } = useBooted(isActive, toRef(props, 'eager'))
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null
    }))

    function onClickOutside (e: MouseEvent) {
      emit('click:outside', e)

      if (!props.persistent) isActive.value = false
      else animateClick()
    }
    function closeConditional () {
      return isActive.value
    }

    const activatorElement = ref<HTMLElement>()
    function onActivatorClick (e: MouseEvent) {
      activatorElement.value = (e.currentTarget || e.target) as HTMLElement
      isActive.value = !isActive.value
    }

    function onKeydown (e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (!props.persistent) {
          isActive.value = false
        } else animateClick()
      }
    }

    const content = ref<HTMLElement>()

    watch(isActive, val => {
      nextTick(() => {
        if (val) {
          content.value?.focus()
        } else {
          activatorElement.value?.focus()
        }
      })
    })

    const root = ref()
    const top = ref<number>()
    watch(() => isActive.value && props.absolute && teleportTarget.value == null, val => {
      if (val) {
        const scrollParent = getScrollParent(root.value)
        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop
        }
      }
    })

    // Add a quick "bounce" animation to the content
    function animateClick () {
      if (props.noClickAnimation) return

      content.value?.animate([
        { transformOrigin: 'center' },
        { transform: 'scale(1.03)' },
        { transformOrigin: 'center' },
      ], {
        duration: 150,
        easing: standardEasing,
      })
    }

    function onAfterLeave () {
      if (!props.eager) isBooted.value = false
    }

    const scrollStrategy =
      props.scrollStrategy === 'close' ? new CloseScrollStrategy(isActive)
      : props.scrollStrategy === 'block' ? new BlockScrollStrategy({ content })
      : null

    if (scrollStrategy) {
      watch(isActive, val => {
        nextTick(() => {
          val ? scrollStrategy.enable() : scrollStrategy.disable()
        })
      })
    }

    useRender(() => (
      <>
        { slots.activator?.({
          isActive: isActive.value,
          props: {
            modelValue: isActive.value,
            'onUpdate:modelValue': (val: boolean) => isActive.value = val,
            onClick: onActivatorClick,
          },
        }) }
        <Teleport to={ teleportTarget.value } disabled={ !teleportTarget.value } ref={ root }>
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
              style={ top.value != null ? `top: ${convertToUnit(top.value)}` : undefined }
              {...attrs}
            >
              <Scrim
                modelValue={ isActive.value && !!props.scrim }
                color={ scrimColor }
              />
              <MaybeTransition transition={ props.transition } appear persisted onAfterLeave={ onAfterLeave }>
                <div
                  class="v-overlay__content"
                  tabindex={ -1 }
                  v-show={ isActive.value }
                  v-click-outside={{ handler: onClickOutside, closeConditional }}
                  ref={ content }
                  onKeydown={ onKeydown }
                >
                  { slots.default?.({ isActive }) }
                </div>
              </MaybeTransition>
            </div>
          )}
        </Teleport>
      </>
    ))

    return {
      content,
      animateClick,
    }
  },
})
