// Components
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { isMaskDelimiter, makeMaskProps, useMask } from '@/composables/mask'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, onBeforeMount, ref, shallowRef, toRef } from 'vue'
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
        while (newCaret > 0 && isMaskDelimiter(newValue[newCaret - 1])) newCaret--
      } else if (inputAction.value === 'Delete') {
        newCaret = oldCaret
      } else if (oldRawValue !== newRawValue) { // insertion
        newCaret = oldCaret + 1
        while (isMaskDelimiter(newValue[newCaret])) newCaret++
        if (isMaskDelimiter(newValue[oldCaret])) newCaret++
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

    function onKeyDown (e: KeyboardEvent) {
      if (e.metaKey) return

      const inputElement = e.target as HTMLInputElement

      caretPosition.value = inputElement.selectionStart || 0
      inputAction.value = e.key

      const hasSelection = inputElement.selectionStart !== inputElement.selectionEnd
      if (e.key === 'Backspace' && hasSelection) {
        e.preventDefault()
        deleteSelection(e)
      }
    }

    async function onCut (e: Event) {
      e.preventDefault()

      copySelectionToClipboard(e)
      deleteSelection(e)
    }

    async function onPaste (e: ClipboardEvent) {
      e.preventDefault()

      const inputElement = e.target as HTMLInputElement
      const pastedString = e.clipboardData?.getData('text')

      if (!pastedString) return

      const pastedCharacters = [...pastedString]
      for (let i = 0; i < pastedCharacters.length; i++) {
        await insertCharacter(inputElement, pastedCharacters[i])
      }
    }

    function copySelectionToClipboard (e: Event) {
      const inputElement = e.target as HTMLInputElement
      const start = inputElement.selectionStart || 0
      const end = inputElement.selectionEnd || 0
      const selectedText = inputElement.value.substring(start, end)
      navigator.clipboard.writeText(selectedText)
    }

    async function deleteSelection (e: Event) {
      const inputElement = e.target as HTMLInputElement
      const curStart = inputElement.selectionStart || 0
      caretPosition.value = inputElement.selectionEnd || 0

      while (caretPosition.value > curStart) {
        const success = await simulateBackspace(inputElement)
        if (!success) break
      }
    }

    async function simulateBackspace (inputElement: HTMLInputElement) {
      inputAction.value = 'Backspace'
      model.value = inputElement.value.slice(0, caretPosition.value - 1) + inputElement.value.slice(caretPosition.value)
      inputAction.value = ''
      if (caretPosition.value === inputElement.selectionEnd) return false
      caretPosition.value = inputElement.selectionEnd || 0
      await nextTick()
      return true
    }

    async function insertCharacter (inputElement: HTMLInputElement, character: string) {
      caretPosition.value = inputElement.selectionEnd || 0
      model.value = inputElement.value.slice(0, caretPosition.value) + character + inputElement.value.slice(caretPosition.value)
      await nextTick()
    }

    useRender(() => {
      const textFieldProps = VTextField.filterProps(props)

      return (
        <VTextField
          { ...textFieldProps }
          v-model={ model.value }
          ref={ vTextFieldRef }
          validationValue={ validationValue.value }
          onCut={ onCut }
          onPaste={ onPaste }
          onKeydown={ onKeyDown }
        >
          {{ ...slots }}
        </VTextField>
      )
    })

    return forwardRefs({}, vTextFieldRef)
  },
})

export type VMaskInput = InstanceType<typeof VMaskInput>
