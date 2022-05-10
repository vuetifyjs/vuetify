import { defineComponent, propsFactory } from '@/util'
import { computed } from 'vue'
import { VSelectionControl } from '../VSelectionControl'

export const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: String,
    default: '$checkboxIndeterminate',
  },
  falseIcon: {
    type: String,
    default: '$checkboxOff',
  },
  trueIcon: {
    type: String,
    default: '$checkboxOn',
  },
  disabled: Boolean,
  readonly: Boolean,
  modelValue: null,
})

export const VCheckboxBtn = defineComponent({
  name: 'VCheckboxBtn',

  inheritAttrs: false,

  props: makeVCheckboxBtnProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { attrs, slots, emit }) {
    const falseIcon = computed(() => {
      return props.indeterminate
        ? props.indeterminateIcon
        : props.falseIcon
    })
    const trueIcon = computed(() => {
      return props.indeterminate
        ? props.indeterminateIcon
        : props.trueIcon
    })

    return () => (
      <VSelectionControl
        { ...attrs }
        class={['v-checkbox-btn', attrs.class]}
        type="checkbox"
        inline
        modelValue={ props.modelValue }
        onUpdate:modelValue={ v => emit('update:modelValue', v) }
        falseIcon={ falseIcon.value }
        trueIcon={ trueIcon.value }
        aria-checked={ props.indeterminate ? 'mixed' : undefined }
        disabled={ props.disabled }
        readonly={ props.readonly }
        v-slots={ slots }
      />
    )
  },
})
