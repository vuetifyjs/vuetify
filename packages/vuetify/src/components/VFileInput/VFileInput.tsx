// Styles
import './VFileInput.sass'

// Components
import { filterFieldProps, makeVFieldProps } from '@/components/VField/VField'
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VChip } from '@/components/VChip'
import { VCounter } from '@/components/VCounter'
import { VField } from '@/components/VField'

// Composables
import { IconValue } from '@/composables/icons'
import { useForwardRef } from '@/composables/forwardRef'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, ref } from 'vue'
import { defineComponent, filterInputAttrs, humanReadableFileSize, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'

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
    hint: String,
    persistentHint: Boolean,
    placeholder: String,
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
      type: IconValue,
      default: '$file',
    },
    modelValue: {
      type: Array as PropType<File[]>,
      default: () => ([]),
      validator: (val: any) => {
        return wrapInArray(val).every(v => v != null && typeof v === 'object')
      },
    },

    ...makeVFieldProps({ clearable: true }),
  },

  emits: {
    'click:clear': (e: MouseEvent) => true,
    'click:control': (e: MouseEvent) => true,
    'update:modelValue': (files: File[]) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { t } = useLocale()
    const model = useProxiedModel(props, 'modelValue')
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
    const vInputRef = ref<VInput>()
    const vFieldRef = ref<VInput>()
    const isFocused = ref(false)
    const inputRef = ref<HTMLInputElement>()
    const messages = computed(() => {
      return props.messages.length
        ? props.messages
        : (props.persistentHint) ? props.hint : ''
    })
    function onFocus () {
      if (inputRef.value !== document.activeElement) {
        inputRef.value?.focus()
      }

      if (!isFocused.value) {
        isFocused.value = true
      }
    }
    function onControlClick (e: MouseEvent) {
      inputRef.value?.click()

      emit('click:control', e)
    }
    function onClear (e: MouseEvent) {
      e.stopPropagation()

      onFocus()

      nextTick(() => {
        model.value = []

        if (inputRef?.value) {
          inputRef.value.value = ''
        }

        emit('click:clear', e)
      })
    }

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const [{ modelValue: _, ...inputProps }] = filterInputProps(props)
      const [fieldProps] = filterFieldProps(props)

      return (
        <VInput
          ref={ vInputRef }
          v-model={ model.value }
          class="v-file-input"
          { ...rootAttrs }
          { ...inputProps }
          onClick:prepend={ onControlClick }
          messages={ messages.value }
        >
          {{
            ...slots,
            default: ({
              isDisabled,
              isDirty,
              isReadonly,
              isValid,
            }) => (
              <VField
                ref={ vFieldRef }
                prepend-icon={ props.prependIcon }
                onClick:control={ onControlClick }
                onClick:clear={ onClear }
                { ...fieldProps }
                active={ isDirty.value || isFocused.value }
                dirty={ isDirty.value }
                focused={ isFocused.value }
                error={ isValid.value === false }
              >
                {{
                  ...slots,
                  default: ({
                    props: { class: fieldClass, ...slotProps },
                  }) => (
                    <>
                      <input
                        ref={ inputRef }
                        type="file"
                        readonly={ isReadonly.value }
                        disabled={ isDisabled.value }
                        multiple={ props.multiple }
                        name={ props.name }
                        onClick={ e => {
                          e.stopPropagation()

                          onFocus()
                        } }
                        onChange={ e => {
                          if (!e.target) return

                          const target = e.target as HTMLInputElement
                          model.value = [...target.files ?? []]
                        } }
                        onFocus={ onFocus }
                        onBlur={ () => (isFocused.value = false) }
                        { ...slotProps }
                        { ...inputAttrs }
                      />

                      { model.value.length > 0 && (
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
                  active={ !!model.value.length }
                  value={ counterValue.value }
                  v-slots={ slots.counter }
                />
              </>
            ) : undefined,
          }}
        </VInput>
      )
    })

    return useForwardRef({}, vInputRef, vFieldRef, inputRef)
  },
})

export type VFileInput = InstanceType<typeof VFileInput>
