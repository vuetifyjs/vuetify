// Styles
import './VDialog.sass'

import { defineComponent, getCurrentInstance, mergeProps, reactive, ref, watch } from 'vue'
import { VOverlay } from '@/components/VOverlay'

// Helpers
// import {
//   convertToUnit,
//   keyCodes,
// } from '../../util/helpers'
import { makeProps } from '@/util/makeProps'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeTransitionProps } from '@/composables/transition'
import { useProxiedModel } from '@/composables/proxiedModel'
import { VDialogTransition } from '@/components/transitions'

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
    modelValue: Boolean,
    ...makeDimensionProps({ width: 'auto' }),
    ...makeTransitionProps({ transition: 'dialog-transition' }),
  }),

  setup (props, { attrs, slots, emit }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { dimensionStyles } = useDimension(props)

    const activatorElement = ref()

    watch(activatorElement, () => {
      // console.log(activatorElement.value.getBoundingClientRect())
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
        transition={ mergeProps(
          { component: VDialogTransition, target: activatorElement.value },
          typeof props.transition === 'string' ? { name: props.transition } : props.transition as any
        ) as any }
        { ...attrs }
        v-slots={{
          default: slots.default,
          activator,
        }}
      />
    )
  },
})
