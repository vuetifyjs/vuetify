// Styles
import './VFileInput.sass'

// Components
import { makeVFieldProps } from '@/components/VField/VField'
import { VChip } from '@/components/VChip'
import { VCounter } from '@/components/VCounter'
import { VField } from '@/components/VField'

// Composables
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { defineComponent, humanReadableFileSize, pick, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VFieldSlot } from '@/components/VField/VField'

export default defineComponent({
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
    prependIcon: {
      type: String,
      default: '$file',
    },
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

    ...makeVFieldProps({ clearable: true }),

    modelValue: {
      type: Array as PropType<File[] | undefined>,
      default: () => ([]),
      validator: (val: any) => {
        return wrapInArray(val).every(v => v != null && typeof v === 'object')
      },
    },
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

    const fieldRef = ref<VField>()
    function focus () {
      fieldRef.value?.inputRef?.focus()
    }
    function blur () {
      fieldRef.value?.inputRef?.blur()
    }
    function click () {
      fieldRef.value?.inputRef?.click()
    }

    useRender(() => {
      const hasCounter = (slots.counter || props.counter || counterValue.value)
      const [_, restAttrs] = pick(attrs, ['class'])

      return (
        <VField
          ref={ fieldRef }
          class={[
            'v-file-input',
            attrs.class,
          ]}
          active={ isDirty.value }
          prepend-icon={ props.prependIcon }
          onUpdate:active={ val => internalDirty.value = val }
          onClick:control={ click }
          onClick:prepend={ click }
          onClick:clear={ e => {
            e.stopPropagation()

            model.value = []

            if (!fieldRef.value?.inputRef?.value) return

            fieldRef.value.inputRef.value = ''
          } }
          { ...attrs }
          { ...props }
          v-slots={{
            ...slots,
            default: ({
              isActive,
              inputRef,
              props: { class: fieldClass, ...slotProps },
            }: VFieldSlot) => (
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
                  { ...restAttrs }
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
        />
      )
    })

    return {
      fieldRef,
      focus,
      blur,
      click,
    }
  },
})
