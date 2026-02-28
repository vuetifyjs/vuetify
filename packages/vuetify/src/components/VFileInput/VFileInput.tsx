// Styles
import './VFileInput.sass'

// Components
import { VChip } from '@/components/VChip'
import { VCounter } from '@/components/VCounter'
import { VField } from '@/components/VField'
import { makeVFieldProps } from '@/components/VField/VField'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'

// Composables
import { useFileDrop } from '@/composables/fileDrop'
import { makeFileFilterProps, useFileFilter } from '@/composables/fileFilter'
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, ref, shallowRef, toRef, watch } from 'vue'
import {
  callEvent,
  filterInputAttrs,
  genericComponent,
  humanReadableFileSize,
  omit,
  propsFactory,
  useRender,
  wrapInArray,
} from '@/util'

// Types
import type { PropType } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

export type VFileInputSlots = VInputSlots & VFieldSlots & {
  counter: never
  selection: {
    fileNames: string[]
    totalBytes: number
    totalBytesReadable: string
  }
}

export const makeVFileInputProps = propsFactory({
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
  hideInput: Boolean,
  multiple: Boolean,
  showSize: {
    type: [Boolean, Number, String] as PropType<boolean | 1000 | 1024>,
    default: false,
    validator: (v: boolean | number) => {
      return (
        typeof v === 'boolean' ||
        [1000, 1024].includes(Number(v))
      )
    },
  },
  truncateLength: {
    type: [Number, String],
    default: 22,
  },

  ...omit(makeVInputProps({ prependIcon: '$file' }), ['direction']),

  modelValue: {
    type: [Array, Object] as PropType<File[] | File | null>,
    default: (props: any) => props.multiple ? [] : null,
    validator: (val: any) => {
      return wrapInArray(val).every(v => v != null && typeof v === 'object')
    },
  },

  ...makeFileFilterProps(),
  ...makeVFieldProps({ clearable: true }),
}, 'VFileInput')

export const VFileInput = genericComponent<VFileInputSlots>()({
  name: 'VFileInput',

  inheritAttrs: false,

  props: makeVFileInputProps(),

  emits: {
    'click:control': (e: MouseEvent) => true,
    'mousedown:control': (e: MouseEvent) => true,
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (files: File | File[]) => true,
    rejected: (files: File[]) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { t } = useLocale()
    const { filterAccepted } = useFileFilter(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      props.modelValue,
      val => wrapInArray(val),
      val => (!props.multiple && Array.isArray(val)) ? val[0] : val,
    )
    const { isFocused, focus, blur } = useFocus(props)
    const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined)
    const totalBytes = computed(() => (model.value ?? []).reduce((bytes, { size = 0 }) => bytes + size, 0))
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value))

    const fileNames = computed(() => (model.value ?? []).map(file => {
      const { name = '', size = 0 } = file
      const truncatedText = truncateText(name)
      return !props.showSize
        ? truncatedText
        : `${truncatedText} (${humanReadableFileSize(size, base.value)})`
    }))

    const counterValue = computed(() => {
      const fileCount = model.value?.length ?? 0
      if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value)
      else return t(props.counterString, fileCount)
    })
    const vInputRef = ref<VInput>()
    const vFieldRef = ref<VInput>()
    const inputRef = ref<HTMLInputElement>()
    const isActive = toRef(() => isFocused.value || props.active)
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant))
    const isDragging = shallowRef(false)
    const { handleDrop, hasFilesOrFolders } = useFileDrop()

    function onFocus () {
      if (inputRef.value !== document.activeElement) {
        inputRef.value?.focus()
      }

      if (!isFocused.value) focus()
    }
    function onClickPrepend (e: MouseEvent) {
      inputRef.value?.click()
    }
    function onControlMousedown (e: MouseEvent) {
      emit('mousedown:control', e)
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

        callEvent(props['onClick:clear'], e)
      })
    }
    function truncateText (str: string) {
      if (str.length < Number(props.truncateLength)) return str
      const charsKeepOneSide = Math.floor((Number(props.truncateLength) - 1) / 2)
      return `${str.slice(0, charsKeepOneSide)}…${str.slice(str.length - charsKeepOneSide)}`
    }
    function onDragover (e: DragEvent) {
      e.preventDefault()
      e.stopImmediatePropagation()
      isDragging.value = true
    }
    function onDragleave (e: DragEvent) {
      e.preventDefault()
      isDragging.value = false
    }
    async function onDrop (e: DragEvent) {
      e.preventDefault()
      e.stopImmediatePropagation()
      isDragging.value = false

      if (!inputRef.value || !hasFilesOrFolders(e)) return

      const allDroppedFiles = await handleDrop(e)
      selectAccepted(allDroppedFiles)
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

    watch(model, newValue => {
      const hasModelReset = !Array.isArray(newValue) || !newValue.length

      if (hasModelReset && inputRef.value) {
        inputRef.value.value = ''
      }
    })

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter)
      const hasDetails = !!(
        (hasCounter && (props.hideDetails !== 'auto' || !!model.value?.length)) ||
        slots.details
      )
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const { modelValue: _, ...inputProps } = VInput.filterProps(props)
      const fieldProps = {
        ...VField.filterProps(props),
        'onClick:clear': onClear,
      }

      const expectsDirectory = attrs.webkitdirectory !== undefined && attrs.webkitdirectory !== false
      const acceptFallback = attrs.accept ? String(attrs.accept) : undefined
      const inputAccept = expectsDirectory ? undefined : (props.filterByType ?? acceptFallback)

      return (
        <VInput
          ref={ vInputRef }
          modelValue={ props.multiple ? model.value : model.value[0] }
          class={[
            'v-file-input',
            {
              'v-file-input--chips': !!props.chips,
              'v-file-input--dragging': isDragging.value,
              'v-file-input--hide': props.hideInput,
              'v-input--plain-underlined': isPlainOrUnderlined.value,
            },
            props.class,
          ]}
          style={ props.style }
          onClick:prepend={ onClickPrepend }
          { ...rootAttrs }
          { ...inputProps }
          centerAffix={ !isPlainOrUnderlined.value }
          focused={ isFocused.value }
          indentDetails={ props.indentDetails ?? !isPlainOrUnderlined.value }
        >
          {{
            ...slots,
            default: ({
              id,
              isDisabled,
              isDirty,
              isReadonly,
              isValid,
              hasDetails,
            }) => (
              <VField
                ref={ vFieldRef }
                prependIcon={ props.prependIcon }
                onMousedown={ onControlMousedown }
                onClick={ onControlClick }
                onClick:prependInner={ props['onClick:prependInner'] }
                onClick:appendInner={ props['onClick:appendInner'] }
                { ...fieldProps }
                id={ id.value }
                active={ isActive.value || isDirty.value }
                dirty={ isDirty.value || props.dirty }
                disabled={ isDisabled.value }
                focused={ isFocused.value }
                details={ hasDetails.value }
                error={ isValid.value === false }
                onDragover={ onDragover }
                onDrop={ onDrop }
              >
                {{
                  ...slots,
                  default: ({
                    props: { class: fieldClass, ...slotProps },
                    controlRef,
                  }) => (
                    <>
                      <input
                        ref={ val => inputRef.value = controlRef.value = val as HTMLInputElement }
                        type="file"
                        accept={ inputAccept }
                        readonly={ isReadonly.value }
                        disabled={ isDisabled.value }
                        multiple={ props.multiple }
                        name={ props.name }
                        onClick={ e => {
                          e.stopPropagation()

                          if (isReadonly.value) e.preventDefault()

                          onFocus()
                        }}
                        onChange={ onFileSelection }
                        onDragleave={ onDragleave }
                        onFocus={ onFocus }
                        onBlur={ blur }
                        { ...slotProps }
                        { ...inputAttrs }
                      />

                      <div class={ fieldClass }>
                        { !!model.value?.length && !props.hideInput && (
                          slots.selection ? slots.selection({
                            fileNames: fileNames.value,
                            totalBytes: totalBytes.value,
                            totalBytesReadable: totalBytesReadable.value,
                          })
                          : props.chips ? fileNames.value.map(text => (
                            <VChip
                              key={ text }
                              size="small"
                              text={ text }
                            />
                          ))
                          : fileNames.value.join(', ')
                        )}
                      </div>
                    </>
                  ),
                }}
              </VField>
            ),
            details: hasDetails ? slotProps => (
              <>
                { slots.details?.(slotProps) }

                { hasCounter && (
                  <>
                    <span />

                    <VCounter
                      active={ !!model.value?.length }
                      value={ counterValue.value }
                      disabled={ props.disabled }
                      v-slots:default={ slots.counter }
                    />
                  </>
                )}
              </>
            ) : undefined,
          }}
        </VInput>
      )
    })

    return forwardRefs({}, vInputRef, vFieldRef, inputRef)
  },
})

export type VFileInput = InstanceType<typeof VFileInput>
