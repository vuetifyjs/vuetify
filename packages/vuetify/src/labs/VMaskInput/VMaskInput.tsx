// Components
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { isMaskDelimiter,  makeMaskProps, useMask } from '@/composables/mask'
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

    const caretPosition = shallowRef(0)

    const mask = useMask(props)
    const returnMaskedValue = computed(() => props.mask && props.returnMaskedValue)

    const validationValue = toRef(() => returnMaskedValue.value ? model.value : mask.unmask(model.value))

    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      // Always display masked value in input when mask is applied
      val => props.mask ? mask.mask(mask.unmask(val)) : val,
      val => {
        if (props.mask) {
          let valueWithoutDelimiters = removeMaskDelimiters(val)

          // E.g. mask is #-# and the input value is '2-23'
          // model-value should be enforced to '2-2'
          const newMaskedValue = mask.mask(valueWithoutDelimiters)
          const newUnmaskedValue = mask.unmask(newMaskedValue)

          const newCaretPosition = getNewCaretPosition({
            oldValue: model.value,
            newValue: newMaskedValue,
            oldCaret: caretPosition.value,
          })

          vTextFieldRef.value!.value = newMaskedValue;
          vTextFieldRef.value!.setSelectionRange(newCaretPosition, newCaretPosition);

          return returnMaskedValue.value ? mask.mask(newUnmaskedValue) : newUnmaskedValue
        }
        return val
      },
    )

    function removeMaskDelimiters (val: string): string {
      return val.split('').filter(ch => !isMaskDelimiter(ch)).join('')
    }

    function mapMaskedToUnmaskedIndex(masked: string, caretPos: number) {
      let rawIndex = 0;
      for (let i = 0; i < caretPos; i++) {
        if (!isMaskDelimiter(masked[i])) rawIndex++;
      }
      return rawIndex;
    }

    function mapUnmaskedToMaskedIndex(masked: string, rawIndex: number) {
      let caret = 0;
      let dataCount = 0;
      while (caret < masked.length && dataCount < rawIndex) {
        if (!isMaskDelimiter(masked[caret])) dataCount++;
        caret++;
      }
      return caret;
    }

    function getNewCaretPosition({
      oldValue,
      newValue,
      oldCaret,
    }: {
      oldValue: string
      newValue: string
      oldCaret: number
    }) {
      const oldRawValue = removeMaskDelimiters(oldValue);
      const newRawValue  = removeMaskDelimiters(newValue);

      const diff = newRawValue.length - oldRawValue.length;

      const oldRawValueCaret = mapMaskedToUnmaskedIndex(oldValue, oldCaret);
      let newRawValueCaret = oldRawValueCaret + diff;

      if (newRawValueCaret < 0) newRawValueCaret = 0;
      if (newRawValueCaret > newRawValue.length) newRawValueCaret = newRawValue.length;

      let newCaret = mapUnmaskedToMaskedIndex(newValue, newRawValueCaret);

      // If inserting and caret lands before a delimiter, move it to the next non-delimiter character.
      if (diff > 0 && isMaskDelimiter(newValue[newCaret]) && newCaret < newValue.length) {
        while (newCaret < newValue.length && isMaskDelimiter(newValue[newCaret])) newCaret++
      }

      return newCaret;
    }

    onBeforeMount(() => {
      if (props.returnMaskedValue) {
        emit('update:modelValue', model.value)
      }
    })

    function setCaretPosition (e: KeyboardEvent) {
      caretPosition.value = vTextFieldRef.value?.selectionEnd || 0

      // To handle forward deletion
      if (e.key === 'Delete') caretPosition.value++
    }

    useRender(() => {
      const textFieldProps = VTextField.filterProps(props)

      return (
        <VTextField
          { ...textFieldProps }
          v-model={ model.value }
          ref={ vTextFieldRef }
          validationValue={ validationValue.value }
          onKeydown={ setCaretPosition }
          onPaste={ setCaretPosition }
        >
          {{ ...slots }}
        </VTextField>
      )
    })

    return forwardRefs({}, vTextFieldRef)
  },
})

export type VMaskInput = InstanceType<typeof VMaskInput>
