// Components
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { isMaskDelimiter, makeMaskProps, useMask } from '@/composables/mask'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, onBeforeMount, ref, shallowRef, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'

export type VMaskInputSlots = VTextFieldSlots

export const makeVMaskInputProps = propsFactory({
  returnMaskedValue: Boolean,
  ...makeVTextFieldProps(),
  ...makeMaskProps(),
}, 'VMaskInput')

export const VMaskInput = genericComponent<VMaskInputSlots>()({
  name: 'VMaskInput',

  props: makeVMaskInputProps(),

  emits: {
    'update:modelValue': (val: string) => true,
  },

  setup (props, { slots, emit }) {
    const vTextFieldRef = ref<VTextField>()

    const selection = shallowRef(0)
    const lazySelection = shallowRef(0)

    const mask = useMask(props)
    const returnMaskedValue = computed(() => props.mask && props.returnMaskedValue)

    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      // Always display masked value in input when mask is applied
      val => props.mask ? mask.mask(mask.unmask(val)) : val,
      val => {
        if (props.mask) {
          const valueBeforeChange = mask.unmask(model.value)
          // E.g. mask is #-# and the input value is '2-23'
          // model-value should be enforced to '2-2'
          const enforcedMaskedValue = mask.mask(mask.unmask(val))
          const newUnmaskedValue = mask.unmask(enforcedMaskedValue)

          if (newUnmaskedValue === valueBeforeChange) {
            vTextFieldRef.value!.value = enforcedMaskedValue
          }
          val = newUnmaskedValue
          updateRange()
          return returnMaskedValue.value ? mask.mask(val) : val
        }
        return val
      },
    )

    const validationValue = toRef(() => returnMaskedValue.value ? model.value : mask.unmask(model.value))

    onBeforeMount(() => {
      if (props.returnMaskedValue) {
        emit('update:modelValue', model.value)
      }
    })

    function setCaretPosition (newSelection: number) {
      selection.value = newSelection
      vTextFieldRef.value && vTextFieldRef.value.setSelectionRange(selection.value, selection.value)
    }

    function resetSelections () {
      if (!vTextFieldRef.value?.selectionEnd) return

      selection.value = vTextFieldRef.value.selectionEnd
      lazySelection.value = 0

      for (let index = 0; index < selection.value; index++) {
        isMaskDelimiter(vTextFieldRef.value.value[index]) || lazySelection.value++
      }
    }

    function updateRange () {
      if (!vTextFieldRef.value) return
      resetSelections()

      let selection = 0
      const newValue = vTextFieldRef.value.value

      if (newValue) {
        for (let index = 0; index < newValue.length; index++) {
          if (lazySelection.value <= 0) break
          isMaskDelimiter(newValue[index]) || lazySelection.value--
          selection++
        }
      }
      setCaretPosition(selection)
    }

    useRender(() => {
      const textFieldProps = VTextField.filterProps(props)

      return (
        <VTextField
          { ...textFieldProps }
          v-model={ model.value }
          ref={ vTextFieldRef }
          validationValue={ validationValue.value }
        >
          {{ ...slots }}
        </VTextField>
      )
    })

    return forwardRefs({}, vTextFieldRef)
  },
})

export type VMaskInput = InstanceType<typeof VMaskInput>
