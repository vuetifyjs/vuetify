// Styles
import './VFileInput.sass'

// Components
import { filterFieldProps, makeVFieldProps } from '@/components/VField/VField'
import { VChip } from '@/components/VChip'
import { VCounter } from '@/components/VCounter'
import { VField } from '@/components/VField'

// Composables
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { defineComponent, filterInputAttrs, humanReadableFileSize, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'

export const VFileInput = defineComponent({
  name: 'VFileInput',

  inheritAttrs: false,

  props: {
    chips: Boolean,
    counter: Boolean,
    counterSizeString: {
      type: String,
      default: '$vuetify.fileInput.counterSize',
    },
    counterString: {
      type: String,
      default: '$vuetify.fileInput.counter',
    },
    multiple: Boolean,
    showSize: {
      type: [Boolean, Number] as PropType<boolean | 1000 | 1024>,
      default: false,
      validator: (v: boolean | number) => {
        return (
          typeof v === 'boolean' ||
          [1000, 1024].includes(v)
        )
      },
    },

    ...makeVInputProps(),

    prependIcon: {
      type: String,
      default: '$file',
    },
    modelValue: {
      type: Array as PropType<File[] | undefined>,
      default: () => ([]),
      validator: (val: any) => {
        return wrapInArray(val).every(v => v != null && typeof v === 'object')
      },
    },

    ...makeVFieldProps({ clearable: true }),
  },

  emits: {
    'update:modelValue': (files: File[]) => true,
  },

  setup (props, { attrs, slots }) {
    const { t } = useLocale()
    const model = useProxiedModel(props, 'modelValue')

    const internalDirty = ref(false)
    const isDirty = computed(() => {
      return internalDirty.value || !!model.value?.length
    })

    const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined)
    const totalBytes = computed(() => (model.value ?? []).reduce((bytes, { size = 0 }) => bytes + size, 0))
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value))

    const fileNames = computed(() => (model.value ?? []).map(file => {
      const { name = '', size = 0 } = file

      return !props.showSize
        ? name
        : `${name} (${humanReadableFileSize(size, base.value)})`
    }))

    const counterValue = computed(() => {
      const fileCount = model.value?.length ?? 0
      if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value)
      else return t(props.counterString, fileCount)
    })

    const inputRef = ref<HTMLInputElement>()
    function focus () {
      inputRef.value?.focus()
    }
    function blur () {
      inputRef.value?.blur()
    }
    function click () {
      inputRef.value?.click()
    }
    function clear (e?: Event) {
      e?.stopPropagation()

      model.value = []

      if (inputRef?.value) {
        inputRef.value.value = ''
      }
    }

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || counterValue.value)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const [inputProps] = filterInputProps(props)
      const [fieldProps, _] = filterFieldProps(props)

      return (
        <VInput
          v-model={ model.value }
          class="v-file-input"
          { ...rootAttrs }
          { ...inputProps }
        >
          {{
            ...slots,
            default: () => (
              <VField
                active={ isDirty.value }
                prepend-icon={ props.prependIcon }
                onUpdate:active={ val => internalDirty.value = val }
                onClick:control={ click }
                onClick:prepend={ click }
                onClick:clear={ clear }
                { ...fieldProps }
              >
                {{
                  ...slots,
                  default: ({
                    isActive,
                    props: { class: fieldClass, ...slotProps },
                  }) => (
                    <>
                      <input
                        ref={ inputRef }
                        type="file"
                        disabled={ props.disabled }
                        multiple={ props.multiple }
                        onClick={ e => e.stopPropagation() }
                        onChange={ e => {
                          if (!e.target) return

                          const target = e.target as HTMLInputElement
                          model.value = [...target.files ?? []]

                          if (!isActive) inputRef.value?.focus()
                        } }
                        { ...slotProps }
                        { ...inputAttrs }
                      />

                      { isDirty.value && (
                        <div class={ fieldClass }>
                          { slots.selection ? slots.selection({
                            fileNames: fileNames.value,
                            totalBytes: totalBytes.value,
                            totalBytesReadable: totalBytesReadable.value,
                          })
                          : props.chips ? fileNames.value.map(text => (
                            <VChip
                              key={ text }
                              size="small"
                              color={ props.color }
                            >{ text }</VChip>
                          ))
                          : fileNames.value.join(', ') }
                        </div>
                      ) }
                    </>
                  ),
                }}
              </VField>
            ),
            details: hasCounter ? () => (
              <>
                <span />

                <VCounter
                  value={ counterValue.value }
                  v-slots={ slots.counter }
                />
              </>
            ) : undefined,
          }}
        </VInput>
      )
    })

    return {
      focus,
      blur,
      click,
    }
  },
})

export type VFileInput = InstanceType<typeof VFileInput>
