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

    const inputAction = shallowRef()
    const caretPosition = shallowRef(0)

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
          const valueWithoutDelimiters = removeMaskDelimiters(val)

          // E.g. mask is #-# and the input value is '2-23'
          // model-value should be enforced to '2-2'
          const newMaskedValue = mask.mask(valueWithoutDelimiters)
          const newUnmaskedValue = mask.unmask(newMaskedValue)

          const newCaretPosition = getNewCaretPosition({
            oldValue: model.value,
            newValue: newMaskedValue,
            oldCaret: caretPosition.value,
          })

          vTextFieldRef.value!.value = newMaskedValue
          vTextFieldRef.value!.setSelectionRange(newCaretPosition, newCaretPosition)

          return returnMaskedValue.value ? mask.mask(newUnmaskedValue) : newUnmaskedValue
        }
        return val
      },
    )

    const validationValue = toRef(() => returnMaskedValue.value ? model.value : mask.unmask(model.value))

    function removeMaskDelimiters (val: string): string {
      return val.split('').filter(ch => !isMaskDelimiter(ch)).join('')
    }

    function getNewCaretPosition ({
      oldValue,
      newValue,
      oldCaret,
    }: {
      oldValue: string
      newValue: string
      oldCaret: number
    }): number {
      if (!newValue) return 0
      if (!oldValue) return newValue.length

      let newCaret: number
      const oldRawValue = removeMaskDelimiters(oldValue)
      const newRawValue = removeMaskDelimiters(newValue)

      if (inputAction.value === 'Backspace') {
        newCaret = oldCaret - 1
      } else if (inputAction.value === 'Delete') {
        newCaret = oldCaret
      } else if (inputAction.value === 'cut') {
        const cutLength = oldValue.length - newValue.length
        newCaret = oldCaret - cutLength
      } else if (inputAction.value === 'paste') {
        newCaret = oldCaret
      } else if (oldRawValue !== newRawValue) { // insertion
        newCaret = oldCaret + 1

        // If caret lands before a delimiter, move it to the next non-delimiter character
        if (isMaskDelimiter(newValue[newCaret])) {
          while (newCaret < newValue.length && isMaskDelimiter(newValue[newCaret])) {
            newCaret++
          }
        }
      } else { // no change
        newCaret = oldCaret
      }

      return newCaret
    }

    onBeforeMount(() => {
      if (props.returnMaskedValue) {
        emit('update:modelValue', model.value)
      }
    })

    function handleKeyDown (e: KeyboardEvent) {
      if (e.metaKey) return

      caretPosition.value = vTextFieldRef.value?.selectionEnd || 0
      inputAction.value = e.key
    }

    function handleClipboardEvent (e: Event) {
      inputAction.value = e.type
    }

    useRender(() => {
      const textFieldProps = VTextField.filterProps(props)

      return (
        <VTextField
          { ...textFieldProps }
          v-model={ model.value }
          ref={ vTextFieldRef }
          validationValue={ validationValue.value }
          onKeydown={ handleKeyDown }
          onPaste={ handleClipboardEvent }
          onCut={ handleClipboardEvent }
        >
          {{ ...slots }}
        </VTextField>
      )
    })

    return forwardRefs({}, vTextFieldRef)
  },
})

export type VMaskInput = InstanceType<typeof VMaskInput>
