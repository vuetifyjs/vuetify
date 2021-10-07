// Styles
import './VCheckbox.sass'

// Components
import { VSelectionControl } from '@/components/VSelectionControl'

// Utility
import { computed, defineComponent, onMounted, ref, watch, watchEffect } from 'vue'
import { pick, useRender } from '@/util'

export const VCheckbox = defineComponent({
  name: 'VCheckbox',

  inheritAttrs: false,

  props: {
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$checkboxIndeterminate',
    },
    offIcon: {
      type: String,
      default: '$checkboxOff',
    },
    onIcon: {
      type: String,
      default: '$checkboxOn',
    },
    modelValue: {
      type: null,
      default: undefined as any,
    },
  },

  setup (props, { attrs, slots }) {
    const indeterminate = ref(props.indeterminate)

    useRender(() => {
      const [_, restAttrs] = pick(attrs, ['class'])

      const offIcon = computed(() => {
        return indeterminate.value
          ? props.indeterminateIcon
          : props.offIcon
      })

      function onChange () {
        if (indeterminate.value) {
          indeterminate.value = false
        }
      }

      return (
        <VSelectionControl
          class="v-checkbox"
          onIcon={ props.onIcon }
          offIcon={ offIcon.value }
          { ...attrs }
          v-slots={{
            ...slots,
            default: ({
              model,
              isReadonly,
              isDisabled,
              props,
            }) => {
              return (
                <input
                  v-model={ model.value }
                  readonly={ isReadonly.value }
                  disabled={ isDisabled.value }
                  type="checkbox"
                  { ...restAttrs }
                  { ...props }
                  onChange={ onChange }
                />
              )
            },
          }}
        />
      )
    })

    return {}
  },
})

export type VCheckbox = InstanceType<typeof VCheckbox>
