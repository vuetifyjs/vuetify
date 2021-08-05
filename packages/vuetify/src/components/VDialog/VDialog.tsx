// Styles
import './VDialog.sass'

// Components
import { VDialogTransition } from '@/components/transitions'
import { VOverlay } from '@/components/VOverlay'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeTransitionProps } from '@/composables/transition'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref, watch } from 'vue'
import { defineComponent, IN_BROWSER } from '@/util'

export default defineComponent({
  name: 'VDialog',

  props: {
    fullscreen: Boolean,
    origin: {
      type: String,
      default: 'center center',
    },
    retainFocus: {
      type: Boolean,
      default: true,
    },
    scrollable: Boolean,
    modelValue: Boolean,

    ...makeDimensionProps({ width: 'auto' }),
    ...makeTransitionProps({
      transition: { component: VDialogTransition },
    }),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { dimensionStyles } = useDimension(props)

    const overlay = ref<InstanceType<typeof VOverlay>>()
    function onFocusin (e: FocusEvent) {
      const before = e.relatedTarget as HTMLElement | null
      const after = e.target as HTMLElement | null

      if (
        before !== after &&
        overlay.value?.contentEl &&
        // It isn't the document or the dialog body
        ![document, overlay.value.contentEl].includes(after!) &&
        // It isn't inside the dialog body
        !overlay.value.contentEl.contains(after)
        // We're the topmost dialog
        // TODO: this.activeZIndex >= this.getMaxZIndex() &&
        // It isn't inside a dependent element (like a menu)
        // TODO: !this.getOpenDependentElements().some(el => el.contains(target))
        // So we must have focused something outside the dialog and its children
      ) {
        const focusable = [...overlay.value.contentEl.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )].filter(el => !el.hasAttribute('disabled')) as HTMLElement[]

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

    return () => {
      return (
        <VOverlay
          v-model={ isActive.value }
          class={[
            'v-dialog',
            {
              'v-dialog--fullscreen': props.fullscreen,
            },
          ]}
          style={ dimensionStyles.value }
          transition={ props.transition }
          ref={ overlay }
          aria-role="dialog"
          aria-modal="true"
          activatorProps={{
            'aria-haspopup': 'dialog',
            'aria-expanded': String(isActive.value),
          }}
          { ...attrs }
          v-slots={{
            default: slots.default,
            activator: slots.activator,
          }}
        />
      )
    }
  },
})
