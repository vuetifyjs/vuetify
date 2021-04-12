// Styles
import './VDialog.sass'

import { defineComponent, getCurrentInstance, mergeProps, reactive, ref, watch } from 'vue'
import { VOverlay } from '@/components/VOverlay'

// Helpers
// import {
//   convertToUnit,
//   keyCodes,
// } from '../../util/helpers'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VDialog',

  props: makeProps({
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
    ...makeDimensionProps({ width: 'auto' }),
  }),

  setup (props, { attrs, slots, emit }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { dimensionStyles } = useDimension(props)

    const activatorElement = ref()

    watch(activatorElement, () => {
      console.log(activatorElement.value.getBoundingClientRect())
    })

    // slots.activator?.({
    //   isActive,
    //   props: {
    //     value: isActive.value,
    //   },
    // })

    const vm = getCurrentInstance() as any
    vm.setupState = reactive({
      activatorElement,
    })

    const activator = ({ props, ...data }: any) => {
      return slots.activator?.({
        ...data,
        props: mergeProps(props, {
          onClick: (e: MouseEvent) => {
            activatorElement.value = e.currentTarget
          },
        }),
      })
    }

    return () => (
      <VOverlay
        v-model={ isActive.value }
        class='v-dialog'
        style={ dimensionStyles.value }
        transition={ props.transition }
        { ...attrs }
        v-slots={{
          default: slots.default,
          activator,
        }}
      />
    )
  },
})
