// Styles
import './VFileUpload.sass'

// Components
import { VFileUploadDropzone, VFileUploadKey } from './VFileUploadDropzone'
import { VFileUploadItem } from './VFileUploadItem'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'

// Composables
import { makeFileFilterProps, useFileFilter } from '@/composables/fileFilter'
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { provide, ref, shallowRef, watch } from 'vue'
import { filterInputAttrs, genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType, VNode } from 'vue'
import type { VInputSlots } from '@/components/VInput/VInput'

export type VFileUploadSlots = Omit<VInputSlots, 'default'> & {
  browse: {
    props: { onClick: (e: MouseEvent) => void }
  }
  default: {}
  icon: never
  input: {
    inputNode: VNode
  }
  item: {
    file: File
    props: { 'onClick:remove': () => void }
  }
  single: {
    file: File
    props: { 'onClick:remove': () => void }
  }
  title: never
  divider: never
}

export const makeVFileUploadProps = propsFactory({
  browseText: {
    type: String,
    default: '$vuetify.fileUpload.browse',
  },
  dividerText: {
    type: String,
    default: '$vuetify.fileUpload.divider',
  },
  title: {
    type: String,
    default: '$vuetify.fileUpload.title',
  },
  subtitle: String,
  icon: {
    type: String,
    default: '$upload',
  },
  clearable: Boolean,
  insetFileList: {
    type: Boolean,
    default: true,
  },
  hideBrowse: Boolean,
  multiple: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true,
  },
  showSize: Boolean,

  ...makeFileFilterProps(),
  ...omit(makeVInputProps(), ['direction']),

  modelValue: {
    type: [Array, Object] as PropType<File[] | File>,
    default: null,
    validator: (val: any) => {
      return wrapInArray(val).every(v => v != null && typeof v === 'object')
    },
  },
}, 'VFileUpload')

export const VFileUpload = genericComponent<VFileUploadSlots>()({
  name: 'VFileUpload',

  inheritAttrs: false,

  props: makeVFileUploadProps(),

  emits: {
    'update:modelValue': (files: File[]) => true,
    'update:focused': (focused: boolean) => true,
    rejected: (files: File[]) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { filterAccepted } = useFileFilter(props)
    const { isFocused } = useFocus(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      props.modelValue,
      val => wrapInArray(val),
      val => (props.multiple || Array.isArray(props.modelValue)) ? val : val[0],
    )

    const vInputRef = ref<VInput>()
    const vDropzoneRef = ref<VFileUploadDropzone>()
    const inputRef = ref<HTMLInputElement | null>(null)
    const isDisabledRef = shallowRef(false)
    const isErrorRef = shallowRef(false)

    provide(VFileUploadKey, {
      files: model,
      disabled: isDisabledRef,
      error: isErrorRef,
      onDrop,
      onClickBrowse: onClick,
      onClickRemove,
    })

    watch(model, newValue => {
      const hasModelReset = !Array.isArray(newValue) || !newValue.length
      if (hasModelReset && inputRef.value) {
        inputRef.value.value = ''
      }
    })

    function onDrop (files: File[]) {
      selectAccepted(files)
    }

    function onFileSelection (e: Event) {
      if (!e.target || (e as any).repack) return // prevent loop

      if (!props.filterByType) {
        const target = e.target as HTMLInputElement
        model.value = [...target.files ?? []]
      } else {
        selectAccepted([...(e as any).target.files])
      }
    }

    function selectAccepted (files: File[]) {
      const dataTransfer = new DataTransfer()
      const { accepted, rejected } = filterAccepted(files)

      if (rejected.length) {
        emit('rejected', rejected)
      }

      for (const file of accepted) {
        dataTransfer.items.add(file)
      }

      inputRef.value!.files = dataTransfer.files
      model.value = [...dataTransfer.files]

      const event = new Event('change', { bubbles: true }) as any
      event.repack = true
      inputRef.value!.dispatchEvent(event)
    }

    function onClick () {
      inputRef.value?.click()
    }

    function onClickRemove (index: number) {
      const newValue = model.value.filter((_, i) => i !== index)
      model.value = newValue

      if (newValue.length > 0 || !inputRef.value) return

      inputRef.value.value = ''
    }

    useRender(() => {
      const { modelValue: _, ...inputProps } = VInput.filterProps(props)
      const { modelValue: __, ...dropzoneProps } = VFileUploadDropzone.filterProps(props as any)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

      const expectsDirectory = attrs.webkitdirectory !== undefined && attrs.webkitdirectory !== false
      const acceptFallback = attrs.accept ? String(attrs.accept) : undefined
      const inputAccept = expectsDirectory ? undefined : (props.filterByType ?? acceptFallback)

      const inputNode = (
        <input
          ref={ inputRef }
          type="file"
          accept={ inputAccept }
          disabled={ props.disabled ?? undefined }
          multiple={ props.multiple }
          name={ props.name }
          onChange={ onFileSelection }
          { ...inputAttrs }
        />
      )

      return (
        <VInput
          ref={ vInputRef }
          modelValue={ props.multiple ? model.value : model.value[0] }
          class={[
            'v-file-upload-input',
            props.class,
          ]}
          style={ props.style }
          focused={ isFocused.value }
          { ...rootAttrs }
          { ...inputProps }
        >
          {{
            ...slots,
            default: ({
              isDisabled,
              isValid,
            }) => {
              isDisabledRef.value = isDisabled.value
              isErrorRef.value = isValid.value === false

              return (
              <>
                { slots.default ? (
                  <>
                    { slots.default({}) }
                    <input
                      ref={ inputRef }
                      type="file"
                      accept={ inputAccept }
                      disabled={ props.disabled ?? undefined }
                      multiple={ props.multiple }
                      name={ props.name }
                      style="display: none;"
                      onChange={ onFileSelection }
                      { ...inputAttrs }
                    />
                  </>
                ) : (
                  <VFileUploadDropzone
                    ref={ vDropzoneRef }
                    { ...dropzoneProps }
                  >
                    {{
                      browse: slots.browse,
                      icon: slots.icon,
                      title: slots.title,
                      divider: slots.divider,
                      single: slots.single,
                      item: slots.item,
                      input: () => slots.input?.({ inputNode }) ?? inputNode,
                    }}
                  </VFileUploadDropzone>
                )}

                { !props.insetFileList && model.value.length > 0 && (
                  <div class="v-file-upload-items">
                    { model.value.map((file, i) => {
                      const slotProps = {
                        file,
                        props: {
                          'onClick:remove': () => onClickRemove(i),
                        },
                      }

                      return (
                        <VDefaultsProvider
                          key={ i }
                          defaults={{
                            VFileUploadItem: {
                              file,
                              clearable: props.clearable,
                              disabled: isDisabled.value,
                              showSize: props.showSize,
                            },
                          }}
                        >
                          { slots.item?.(slotProps) ?? (
                            <VFileUploadItem
                              key={ i }
                              onClick:remove={ () => onClickRemove(i) }
                            />
                          )}
                        </VDefaultsProvider>
                      )
                    })}
                  </div>
                )}
              </>
              )
            },
          }}
        </VInput>
      )
    })

    return forwardRefs({}, vInputRef, vDropzoneRef)
  },
})

export type VFileUpload = InstanceType<typeof VFileUpload>
