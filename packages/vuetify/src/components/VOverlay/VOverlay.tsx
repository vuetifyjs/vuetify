// Styles
import './VOverlay.sass'

import { defineComponent, ref, Teleport, Transition, watch } from 'vue'
import makeProps from '@/util/makeProps'
import { useProxiedModel } from '@/composables/proxiedModel'
import { provideTheme } from '@/composables/theme'

import type { Ref } from 'vue'
import { maybeTransition } from '@/util'

function useTeleport () {
  if (!useTeleport.target) {
    const el = document.createElement('div')
    el.className = 'v-overlay-container'
    document.body.appendChild(el)
    useTeleport.target = el
  }

  return { teleportTarget: useTeleport.target }
}
useTeleport.target = null as HTMLElement | null

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

export default defineComponent({
  name: 'VOverlay',

  inheritAttrs: false,

  props: makeProps({
    absolute: Boolean,
    persistent: Boolean,
    modelValue: Boolean,
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

    function onScrimClick () {
      if (!props.persistent) isActive.value = false
    }

    return () => (
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
              { isActive.value && <div class="v-overlay__scrim" onClick={ onScrimClick }></div> }
            </Transition>
            { maybeTransition(
              props,
              { appear: true },
              isActive.value && <div class="v-overlay__content">{ slots.default?.() }</div>
            ) }
          </div>
        )}
      </Teleport>
    )
  },
})
