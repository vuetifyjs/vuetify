// Styles
import './VDialog.sass'

import { defineComponent } from 'vue'
import { VOverlay } from '@/components/VOverlay'

// Helpers
import {
  convertToUnit,
  keyCodes,
} from '../../util/helpers'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VDialog',

  props: makeProps({
    ...makeDimensionProps({ width: 'auto' }),
    disabled: Boolean,
    fullscreen: Boolean,
    noClickAnimation: Boolean,
    origin: {
      type: String,
      default: 'center center',
    },
    persistent: Boolean,
    retainFocus: {
      type: Boolean,
      default: true,
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition',
    },
    modelValue: Boolean,
  }),

  setup (props, { slots, emit }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { dimensionStyles } = useDimension(props)

    function onActivatorClick (e: MouseEvent) {
      isActive.value = !isActive.value
    }

    return () => (
      <>
        { slots.activator?.({
          isActive,
          props: {
            value: isActive.value,
            onClick: onActivatorClick,
          },
        }) }
        <VOverlay
          v-model={ isActive.value }
          class='v-dialog'
          style={ dimensionStyles }
          transition={ props.transition }
        >
          { slots.default?.() }
        </VOverlay>
      </>
    )
  },
})
