// Styles
import './VFileUpload.sass'

// Components
import { VFileUploadItem } from './VFileUploadItem'
import { VBtn } from '@/components/VBtn/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { makeVDividerProps, VDivider } from '@/components/VDivider/VDivider'
import { VIcon } from '@/components/VIcon/VIcon'
import { VOverlay } from '@/components/VOverlay/VOverlay'
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Composables
import { makeDelayProps } from '@/composables/delay'
import { makeDensityProps, useDensity } from '@/composables/density'
import { useFileDrop } from '@/composables/fileDrop'
import { makeFileFilterProps, useFileFilter } from '@/composables/fileFilter'
import { IconValue } from '@/composables/icons'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref, shallowRef } from 'vue'
import { filterInputAttrs, genericComponent, pick, propsFactory, renderSlot, useRender, wrapInArray } from '@/util'

// Types
import type { PropType, VNode } from 'vue'

export type VFileUploadSlots = {
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
    type: IconValue,
    default: '$upload',
  },
  modelValue: {
    type: [Array, Object] as PropType<File[] | File>,
    default: null,
    validator: (val: any) => {
      return wrapInArray(val).every(v => v != null && typeof v === 'object')
    },
  },
  clearable: Boolean,
  disabled: Boolean,
  hideBrowse: Boolean,
  multiple: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true,
  },
  showSize: Boolean,
  name: String,

  ...makeFileFilterProps(),
  ...makeDelayProps(),
  ...makeDensityProps(),
  ...pick(makeVDividerProps({
    length: 150,
  }), ['length', 'thickness', 'opacity']),
  ...makeVSheetProps(),
}, 'VFileUpload')

export const VFileUpload = genericComponent<VFileUploadSlots>()({
  name: 'VFileUpload',

  inheritAttrs: false,

  props: makeVFileUploadProps(),

  emits: {
    'update:modelValue': (files: File[]) => true,
    rejected: (files: File[]) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { t } = useLocale()
    const { densityClasses } = useDensity(props)
    const { filterAccepted } = useFileFilter(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      props.modelValue,
      val => wrapInArray(val),
      val => (props.multiple || Array.isArray(props.modelValue)) ? val : val[0],
    )

    const isDragging = shallowRef(false)
    const vSheetRef = ref<InstanceType<typeof VSheet> | null>(null)
    const inputRef = ref<HTMLInputElement | null>(null)
    const { handleDrop } = useFileDrop()

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

      if (!inputRef.value) return

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
      const hasTitle = !!(slots.title || props.title)
      const hasIcon = !!(slots.icon || props.icon)
      const hasBrowse = !!(!props.hideBrowse && (slots.browse || props.density === 'default'))
      const cardProps = VSheet.filterProps(props)
      const dividerProps = VDivider.filterProps(props)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

      const expectsDirectory = attrs.webkitdirectory !== undefined && attrs.webkitdirectory !== false
      const acceptFallback = attrs.accept ? String(attrs.accept) : undefined
      const inputAccept = expectsDirectory ? undefined : (props.filterByType ?? acceptFallback)

      const inputNode = (
        <input
          ref={ inputRef }
          type="file"
          accept={ inputAccept }
          disabled={ props.disabled }
          multiple={ props.multiple }
          name={ props.name }
          onChange={ onFileSelection }
          { ...inputAttrs }
        />
      )

      return (
        <>
          <VSheet
            ref={ vSheetRef }
            { ...cardProps }
            class={[
              'v-file-upload',
              {
                'v-file-upload--clickable': !hasBrowse,
                'v-file-upload--disabled': props.disabled,
                'v-file-upload--dragging': isDragging.value,
              },
              densityClasses.value,
              props.class,
            ]}
            style={[
              props.style,
            ]}
            onDragleave={ onDragleave }
            onDragover={ onDragover }
            onDrop={ onDrop }
            onClick={ !hasBrowse ? onClick : undefined }
            { ...rootAttrs }
          >
            { hasIcon && (
              <div key="icon" class="v-file-upload-icon">
                { !slots.icon ? (
                  <VIcon
                    key="icon-icon"
                    icon={ props.icon }
                  />
                ) : (
                  <VDefaultsProvider
                    key="icon-defaults"
                    defaults={{
                      VIcon: {
                        icon: props.icon,
                      },
                    }}
                  >
                    { renderSlot(slots, 'icon') }
                  </VDefaultsProvider>
                )}
              </div>
            )}

            { hasTitle && (
              <div key="title" class="v-file-upload-title">
                { renderSlot(slots, 'title', () => t(props.title)) }
              </div>
            )}

            { props.density === 'default' && (
              <>
                <div key="upload-divider" class="v-file-upload-divider">
                  { renderSlot(slots, 'divider', () => (
                    <VDivider { ...dividerProps }>
                      { t(props.dividerText) }
                    </VDivider>
                  ))}
                </div>

                { hasBrowse && (
                  <>
                    { !slots.browse ? (
                      <VBtn
                        readonly={ props.disabled }
                        size="large"
                        text={ t(props.browseText) }
                        variant="tonal"
                        onClick={ onClick }
                      />
                    ) : (
                      <VDefaultsProvider
                        defaults={{
                          VBtn: {
                            readonly: props.disabled,
                            size: 'large',
                            text: t(props.browseText),
                            variant: 'tonal',
                          },
                        }}
                      >
                        { renderSlot(slots, 'browse', { props: { onClick } }) }
                      </VDefaultsProvider>
                    )}
                  </>
                )}

                { props.subtitle && (
                  <div class="v-file-upload-subtitle">
                    { props.subtitle }
                  </div>
                )}
              </>
            )}

            <VOverlay
              modelValue={ isDragging.value }
              contained
              scrim={ props.scrim }
            />

            { renderSlot(slots, 'input', { inputNode }, () => inputNode) }
          </VSheet>

          { model.value.length > 0 && (
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
                        disabled: props.disabled,
                        showSize: props.showSize,
                      },
                    }}
                  >
                    { renderSlot(slots, 'item', slotProps, () => (
                      <VFileUploadItem
                        key={ i }
                        onClick:remove={ () => onClickRemove(i) }
                        v-slots={ slots }
                      />
                    ))}
                  </VDefaultsProvider>
                )
              })}
            </div>
          )}
        </>
      )
    })
  },
})

export type VFileUpload = InstanceType<typeof VFileUpload>
