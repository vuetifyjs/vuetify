// Styles
import './VOverlay.sass'

// Directives
import { ClickOutside } from '@/directives/click-outside'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTeleport } from '@/composables/teleport'

// Utilities
import { convertToUnit, getScrollParent, getScrollParents, standardEasing, useRender } from '@/util'
import { makeProps } from '@/util/makeProps'
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
import { useRtl } from '@/composables/rtl'
import { makeRouterProps, useBackButton, useLink, useRoute } from '@/composables/router'

// Types
import type { BackgroundColorData } from '@/composables/color'
import type { Prop, PropType, Ref } from 'vue'

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
  private content: Ref<HTMLElement | undefined>
  private scrollElements: EventTarget[] = []
  private isActive: Ref<boolean>

  constructor ({ content, isActive }: { content: Ref<HTMLElement | undefined>, isActive: Ref<boolean> }) {
    this.content = content
    this.isActive = isActive
  }

  enable () {
    this.scrollElements = [document, ...getScrollParents(this.content.value)]

    this.scrollElements.forEach(el => {
      el.addEventListener('scroll', this.onScroll.bind(this), { passive: true })
    })
  }

  disable () {
    this.scrollElements.forEach(el => {
      el.removeEventListener('scroll', this.onScroll.bind(this))
    })
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
    this.scrollElements = getScrollParents(this.content.value)
    const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth

    document.documentElement.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth))

    this.scrollElements.forEach((el, i) => {
      this.initialOverflow[i] = el.style.overflowY
      el.style.overflowY = 'hidden'
      el.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth))
    })
  }

  disable () {
    this.scrollElements.forEach((el, i) => {
      el.style.overflowY = this.initialOverflow[i]
      el.style.removeProperty('--v-scrollbar-offset')
    })
    document.documentElement.style.removeProperty('--v-scrollbar-offset')
  }
}

function useLinkModel (props) {
  const _isActive = useProxiedModel(props, 'modelValue')
  const link = useLink(props)
  const isActive = computed({
    get: () => {
      return !!(_isActive.value || link?.isActive.value)
    },
    set: val => {
      _isActive.value = val
    },
  })

  return { link, isActive }
}

export default defineComponent({
  name: 'VOverlay',

  directives: { ClickOutside },

  inheritAttrs: false,

  props: makeProps({
    absolute: Boolean,
    attach: {
      type: [Boolean, String, Object] as PropType<boolean | string | Element>,
      default: 'body',
    },
    eager: Boolean,
    noClickAnimation: Boolean,
    modelValue: Boolean,
    origin: [String, Object] as Prop<string | Element>,
    persistent: Boolean,
    positionStrategy: {
      type: String as PropType<typeof positionStrategies[number]>,
      default: 'global',
      validator: (val: any) => positionStrategies.includes(val),
    },
    scrim: {
      type: [String, Boolean],
      default: true,
    },
    scrollStrategy: {
      type: String as PropType<typeof scrollStrategies[number]>,
      default: 'block',
      validator: (val: any) => scrollStrategies.includes(val),
    },
    ...makeThemeProps(),
    ...makeTransitionProps(),
    ...makeRouterProps(),
  }),

  emits: {
    'click:outside': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots, attrs, emit }) {
    const _isActive = useProxiedModel(props, 'modelValue')
    const link = useLink(props)
    const isActive = computed({
      get: () => {
        return !!(_isActive.value || link?.isActive.value)
      },
      set: val => {
        _isActive.value = val
      },
    })

    const { teleportTarget } = useTeleport(toRef(props, 'attach'))
    const { themeClasses } = useTheme(props)
    const { rtlClasses } = useRtl()
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

    useBackButton(next => {
      if (isActive.value) {
        next(false)
        if (!props.persistent) isActive.value = false
        else animateClick()
      } else {
        next()
      }
    })

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
      props.scrollStrategy === 'close' ? new CloseScrollStrategy({ content, isActive })
      : props.scrollStrategy === 'block' ? new BlockScrollStrategy({ content })
      : null

    // TODO: reactive
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
        <Teleport
          disabled={ !teleportTarget.value }
          ref={ root }
          to={ teleportTarget.value }
        >
          { isBooted.value && (
            <div
              class={[
                'v-overlay',
                {
                  'v-overlay--absolute': props.absolute,
                  'v-overlay--active': isActive.value,
                },
                themeClasses.value,
                rtlClasses.value,
              ]}
              style={ top.value != null ? `top: ${convertToUnit(top.value)}` : undefined }
              {...attrs}
            >
              <Scrim
                color={ scrimColor }
                modelValue={ isActive.value && !!props.scrim }
              />
              <MaybeTransition
                appear
                onAfterLeave={ onAfterLeave }
                persisted
                transition={ props.transition }
              >
                <div
                  ref={ content }
                  v-show={ isActive.value }
                  v-click-outside={{ handler: onClickOutside, closeConditional }}
                  class="v-overlay__content"
                  tabindex={ -1 }
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
      animateClick,
      content,
    }
  },
})
