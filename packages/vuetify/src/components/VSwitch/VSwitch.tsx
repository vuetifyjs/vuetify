// Styles
import './VSwitch.sass'

// Components
import { VSelectionControl } from '@/components/VSelectionControl'
import { VInput } from '@/components/VInput'
import { filterInputAttrs, filterInputProps } from '@/components/VInput/VInput'

// Utility
import { defineComponent, ref } from 'vue'
import { useRender } from '@/util'
import { useProxiedModel } from '@/composables/proxiedModel'

export const VSwitch = defineComponent({
  name: 'VSwitch',

  inheritAttrs: false,

  props: {
    indeterminate: Boolean,
    inset: Boolean,
    loading: [Boolean, String],
    flat: Boolean,
  },
  emits: {
    'update:indeterminate': (val: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const indeterminate = useProxiedModel(props, 'indeterminate')
    function onChange () {
      if (indeterminate.value) {
        indeterminate.value = false
      }
    }

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const [rootProps, inputProps] = filterInputProps(inputAttrs)
      const control = ref<VSelectionControl>()

      function onClick () {
        control.value?.input?.click()
      }

      return (
        <VInput
          class={[
            'v-switch',
            { 'v-switch--indeterminate': indeterminate.value },
          ]}
          { ...rootAttrs }
          { ...rootProps }
          v-slots={{
            ...slots,
            default: ({
              isDisabled,
              isReadonly,
            }) => (
              <VSelectionControl
                type="checkbox"
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
                onUpdate:modelValue={ onChange }
                aria-checked={ indeterminate.value ? 'mixed' : undefined }
                ref={ control }
                { ...inputProps }
                v-slots={{
                  default: () => (<div class="v-switch__track" onClick={ onClick }></div>),
                  input: ({ textColorClasses }) => (
                    <div
                      class={[
                        'v-switch__thumb',
                        textColorClasses.value,
                      ]}
                    />
                  ),
                }}
              />
            ),
          }}
        />
      )
    })

    return {}
  },
})

export type VSwitch = InstanceType<typeof VSwitch>
