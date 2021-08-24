// Styles
import './VFileInput.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VChip } from '@/components/VChip'
import { VField } from '@/components/VField'

// Composables
import { makeVFieldProps } from '@/components/VField/VField'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, watch } from 'vue'
import { defineComponent, humanReadableFileSize, pick, wrapInArray } from '@/util'

// Types
import type { DefaultInputSlot, VFieldSlot } from '@/components/VField/VField'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VFileInput',

  inheritAttrs: false,

  props: {
    appendIcon: String,
    prependIcon: String,
    chips: Boolean,
    clearable: {
      type: Boolean,
      default: true,
    },
    counterSizeString: {
      type: String,
      default: '$vuetify.fileInput.counterSize',
    },
    counterString: {
      type: String,
      default: '$vuetify.fileInput.counter',
    },
    counter: Boolean,
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
    modelValue: {
      type: Array as PropType<File[] | undefined>,
      validator: (val: any) => {
        return wrapInArray(val).every(v => v != null && typeof v === 'object')
      },
    },

    ...makeVFieldProps({
      appendInnerIcon: '$clear',
      prependIcon: '$file',
    }),
  },

  emits: {
    'update:modelValue': (files: File[]) => true,
  },

  setup (props, { attrs, slots }) {
    const { t } = useLocale()
    const fileValue = useProxiedModel(props, 'modelValue')
    const rootRef = ref<VField>()

    watch(() => props.modelValue, value => {
      if (rootRef.value?.inputRef?.value && (value == null || value?.length === 0)) {
        rootRef.value.inputRef.value = ''
      }
    })

    const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined)
    const totalBytes = computed(() => (fileValue.value ?? []).reduce((bytes, { size = 0 }) => bytes + size, 0))
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value))

    const fileNames = computed(() => (fileValue.value ?? []).map(file => {
      const { name = '', size = 0 } = file

      return !props.showSize
        ? name
        : `${name} (${humanReadableFileSize(size, base.value)})`
    }))

    const counterText = computed(() => {
      const fileCount = fileValue.value?.length ?? 0
      if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value)
      else return t(props.counterString, fileCount)
    })

    return () => {
      const [_, restAttrs] = pick(attrs, ['class'])

      return (
        <VField
          ref={ rootRef }
          class={[
            'v-file-input',
            attrs.class,
          ]}
          dirty={ fileValue.value && !!fileValue.value.length }
          { ...props }
          onClick:control={ ({ inputRef }) => inputRef.value?.click() }
          v-slots={{
            prepend: props.prependIcon ? ({ inputRef }: VFieldSlot) => (
              <VBtn
                disabled={ props.disabled }
                icon={ props.prependIcon }
                tabindex="-1"
                variant="text"
                onClick={ () => inputRef.value?.click() }
              />
            ) : undefined,

            default: ({ isDirty, isFocused, inputRef, props: slotProps }: VFieldSlot) => (
              <>
                <input
                  ref={ inputRef }
                  type="file"
                  id={ slotProps.id }
                  disabled={ props.disabled }
                  multiple={ props.multiple }
                  onFocus={ slotProps.onFocus }
                  onBlur={ slotProps.onBlur }
                  onClick={ e => e.stopPropagation() }
                  onChange={ e => {
                    if (!e.target) return

                    const target = e.target as HTMLInputElement
                    const files = [...target.files ?? []]
                    fileValue.value = files

                    if (!isFocused) inputRef.value?.focus()
                  } }
                  { ...restAttrs }
                />

                { isDirty && (
                  <div class={ slotProps.class }>
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

            appendInner: ({ inputRef, focus, blur }: DefaultInputSlot) => props.clearable ? (
              <VBtn
                class="v-file-input__clearable"
                color={ props.color }
                disabled={ props.disabled || !fileValue.value?.length }
                icon={ props.appendInnerIcon }
                variant="text"
                onFocus={ focus }
                onBlur={ blur }
                onClick={
                  (e: Event) => {
                    e.stopPropagation()

                    fileValue.value = []
                    inputRef.value!.value = ''
                  }
                }
              />
            ) : undefined,

            details: props.counter ? () => (
              <>
                <span />
                <span>{ counterText.value }</span>
              </>
            ) : undefined,
          }}
        />
      )
    }
  },
})
