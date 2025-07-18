// Components
import { VTextField } from '@/components/VTextField'

// Composables
import { useTextColor } from '@/composables/color'
import { forwardRefs } from '@/composables/forwardRefs'

// Utilities
import { ref, shallowRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVTimePickerFieldProps = propsFactory({
  active: Boolean,
  color: String,
  disabled: Boolean,
  label: String,
  modelValue: String as PropType<string | number | null>,
  readonly: Boolean,
}, 'VTimePickerField')

export const VTimePickerField = genericComponent()({
  name: 'VTimePickerField',

  inheritAttrs: false,

  props: makeVTimePickerFieldProps(),

  emits: {
    'update:modelValue': (v: string | null) => true,
  },

  setup (props, { emit, attrs }) {
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)

    const vTextInputRef = ref<VTextField>()
    const isFocused = shallowRef(false)

    function onKeydown (e: KeyboardEvent) {
      if (['Backspace', 'Delete'].includes(e.key)) {
        e.preventDefault()

        const target = e.target as HTMLInputElement
        target.value = ''
        emit('update:modelValue', null)
      }
    }

    useRender(() => {
      return (
        <div>
          <VTextField
            ref={ vTextInputRef }
            autocomplete="off"
            class={[
              'v-time-picker-controls__time__field',
              { 'v-time-picker-controls__time__field--active': props.active },
              props.active ? textColorClasses.value : [],
            ]}
            style={ props.active ? textColorStyles.value : [] }
            disabled={ props.disabled }
            variant="solo-filled"
            inputmode="numeric"
            hideDetails
            flat
            modelValue={ props.modelValue ?? (isFocused.value ? '' : '--') }
            onUpdate:modelValue={ v => emit('update:modelValue', v) }
            onKeydown={ onKeydown }
            onFocus={ () => isFocused.value = true }
            onBlur={ () => isFocused.value = false }
            { ...attrs }
          />
          <div class="v-time-picker-controls__field-label">{ props.label }</div>
        </div>
      )
    })

    return forwardRefs({}, vTextInputRef)
  },
})

export type VTimePickerField = InstanceType<typeof VTimePickerField>
