// Styles
import './VFileUpload.sass'

// Components
import { VFileUploadDropzone, VFileUploadKey } from './VFileUploadDropzone'
import { VFileUploadList } from './VFileUploadList'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'

// Composables
import { makeFileFilterProps, useFileFilter } from '@/composables/fileFilter'
import { useFocus } from '@/composables/focus'
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { IconValue } from '@/composables/icons'
import { LoaderSlot, makeLoaderProps, useLoader } from '@/composables/loader'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { provide, ref, shallowRef, toRef, watch } from 'vue'
import { filterInputAttrs, genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType, VNode } from 'vue'
import type { VInputSlots } from '@/components/VInput/VInput'
import type { LoaderSlotProps } from '@/composables/loader'

export type VFileUploadSlots = Omit<VInputSlots, 'default'> & {
  browse: {
    props: { onClick: (e: MouseEvent) => void }
  }
  default: never
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
  loader: LoaderSlotProps
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
    type: IconValue,
    default: '$upload',
  },
  clearable: Boolean,
  insetFileList: Boolean,
  hideBrowse: Boolean,
  multiple: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true,
  },
  showSize: Boolean,

  ...makeFileFilterProps(),
  ...makeLoaderProps(),
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
    const { loaderClasses } = useLoader(props)
    const form = useForm(props)
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
    const isError = toRef(() => vInputRef.value?.isValid === false)
    const loadingColor = shallowRef<string | undefined>(undefined)

    watch(() => props.loading, (val, old) => {
      loadingColor.value = !val && typeof old === 'string'
        ? old
        : typeof val === 'boolean'
          ? undefined
          : val
    }, { immediate: true })

    provide(VFileUploadKey, {
      files: model,
      disabled: form.isDisabled,
      error: isError,
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
      const target = e.target as HTMLInputElement
      const selectedFiles = [...target.files ?? []]
      if (!selectedFiles.length) return

      if (!props.filterByType) {
        model.value = props.multiple ? [...model.value, ...selectedFiles] : selectedFiles
      } else {
        selectAccepted(selectedFiles)
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
      const newFiles = [...dataTransfer.files]
      model.value = props.multiple ? [...model.value, ...newFiles] : newFiles

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
          onUpdate:modelValue={ val => {
            if (val == null || (Array.isArray(val) && !val.length)) {
              model.value = []
            }
          }}
          class={[
            'v-file-upload',
            loaderClasses.value,
            props.class,
          ]}
          style={ props.style }
          focused={ isFocused.value }
          { ...rootAttrs }
          { ...inputProps }
        >
          {{
            ...slots,
            default: () => {
              return (
              <>
                { slots.default ? (
                  <>
                    { slots.default() }
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
                      loader: () => (
                        <LoaderSlot
                          name="v-file-upload"
                          active={ !!props.loading }
                          color={ loadingColor.value }
                          v-slots={{ default: slots.loader }}
                        />
                      ),
                    }}
                  </VFileUploadDropzone>
                )}

                { !slots.default && !props.insetFileList && (
                  <VDefaultsProvider
                    defaults={{
                      VFileUploadList: {
                        clearable: props.clearable,
                        showSize: props.showSize,
                      },
                    }}
                  >
                    <VFileUploadList>
                      {{ item: slots.item }}
                    </VFileUploadList>
                  </VDefaultsProvider>
                )}
              </>
              )
            },
          }}
        </VInput>
      )
    })

    return forwardRefs({
      controlRef: inputRef,
    }, vInputRef, vDropzoneRef)
  },
})

export type VFileUpload = InstanceType<typeof VFileUpload>
