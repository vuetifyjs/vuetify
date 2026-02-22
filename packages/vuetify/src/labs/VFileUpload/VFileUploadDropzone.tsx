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
import { forwardRefs } from '@/composables/forwardRefs'
import { IconValue } from '@/composables/icons'
import { useLocale } from '@/composables/locale'

// Utilities
import { inject, ref, shallowRef } from 'vue'
import { genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'

export interface VFileUploadContext {
  files: Ref<readonly File[]>
  disabled: Ref<boolean>
  error: Ref<boolean>
  onDrop: (files: File[]) => void
  onClickBrowse: () => void
  onClickRemove: (index: number) => void
}

export const VFileUploadKey: InjectionKey<VFileUploadContext> = Symbol.for('vuetify:file-upload')

export type VFileUploadDropzoneSlots = {
  default: {
    isDragging: boolean
    hasFiles: boolean
    files: readonly File[]
    props: { onClick: () => void }
  }
  browse: {
    props: { onClick: (e: MouseEvent) => void }
  }
  icon: never
  title: never
  divider: never
  single: {
    file: File
    props: { 'onClick:remove': () => void }
  }
  item: {
    file: File
    props: { 'onClick:remove': () => void }
  }
  input: never
}

export const makeVFileUploadDropzoneProps = propsFactory({
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
  disabled: Boolean,
  error: Boolean,
  hideBrowse: Boolean,
  insetFileList: Boolean,
  multiple: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true,
  },
  showSize: Boolean,

  ...makeDelayProps(),
  ...makeDensityProps(),
  ...pick(makeVDividerProps({
    length: 150,
  }), ['length', 'thickness', 'opacity']),
  ...makeVSheetProps(),

  modelValue: {
    type: Array as PropType<File[]>,
    default: () => [],
  },
}, 'VFileUploadDropzone')

export const VFileUploadDropzone = genericComponent<VFileUploadDropzoneSlots>()({
  name: 'VFileUploadDropzone',

  props: makeVFileUploadDropzoneProps(),

  emits: {
    'click:browse': () => true,
    'click:remove': (index: number) => true,
    drop: (files: File[]) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const { densityClasses } = useDensity(props)
    const { handleDrop } = useFileDrop()
    const context = inject(VFileUploadKey, null)
    const vSheetRef = ref<VSheet>()
    const isDragging = shallowRef(false)

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

      const files = await handleDrop(e)
      if (context) {
        context.onDrop(files)
      } else {
        emit('drop', files)
      }
    }

    function onClickBrowse () {
      if (context) {
        context.onClickBrowse()
      } else {
        emit('click:browse')
      }
    }

    function onClickRemove (index: number) {
      if (context) {
        context.onClickRemove(index)
      } else {
        emit('click:remove', index)
      }
    }

    useRender(() => {
      const modelValue = context?.files.value ?? props.modelValue
      const disabled = context?.disabled.value ?? props.disabled
      const error = context?.error.value ?? props.error
      const hasTitle = !!(slots.title || props.title)
      const hasIcon = !!(slots.icon || props.icon)
      const hasBrowse = !!(!props.hideBrowse && (slots.browse || props.density === 'default'))
      const hasFiles = modelValue.length > 0
      const isInset = props.insetFileList && hasFiles
      const sheetProps = VSheet.filterProps(props)
      const dividerProps = VDivider.filterProps(props)

      return (
        <VSheet
          ref={ vSheetRef }
          { ...sheetProps }
          class={[
            'v-file-upload',
            {
              'v-file-upload--clickable': !hasBrowse && !hasFiles,
              'v-file-upload--disabled': disabled,
              'v-file-upload--dragging': isDragging.value,
              'v-file-upload--has-files': hasFiles,
              'v-file-upload--error': error,
            },
            densityClasses.value,
            props.class,
          ]}
          style={ props.style }
          onDragleave={ onDragleave }
          onDragover={ onDragover }
          onDrop={ onDrop }
          onClick={ !hasBrowse && !hasFiles ? onClickBrowse : undefined }
        >
          { slots.default?.({
            isDragging: isDragging.value,
            hasFiles,
            files: modelValue,
            props: { onClick: onClickBrowse },
          }) ?? (isInset ? (
            <div key="inset" class="v-file-upload-inset">
              { modelValue.length === 1 && !props.multiple ? (
                slots.single?.({
                  file: modelValue[0],
                  props: { 'onClick:remove': () => onClickRemove(0) },
                }) ?? (
                  <VDefaultsProvider
                    defaults={{
                      VFileUploadItem: {
                        file: modelValue[0],
                        clearable: props.clearable,
                        disabled,
                        showSize: props.showSize,
                        border: false,
                      },
                    }}
                  >
                    <VFileUploadItem
                      onClick:remove={ () => onClickRemove(0) }
                    />
                  </VDefaultsProvider>
                )
              ) : (
                modelValue.map((file, i) => {
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
                          disabled,
                          showSize: props.showSize,
                          border: false,
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
                })
              )}
            </div>
          ) : (
            <>
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
                      { slots.icon() }
                    </VDefaultsProvider>
                  )}
                </div>
              )}

              { hasTitle && (
                <div key="title" class="v-file-upload-title">
                  { slots.title?.() ?? t(props.title) }
                </div>
              )}

              { props.density === 'default' && (
                <>
                  <div key="upload-divider" class="v-file-upload-divider">
                    { slots.divider?.() ?? (
                      <VDivider { ...dividerProps }>
                        { t(props.dividerText) }
                      </VDivider>
                    )}
                  </div>

                  { hasBrowse && (
                    <>
                      { !slots.browse ? (
                        <VBtn
                          readonly={ disabled }
                          size="large"
                          text={ t(props.browseText) }
                          variant="tonal"
                          onClick={ onClickBrowse }
                        />
                      ) : (
                        <VDefaultsProvider
                          defaults={{
                            VBtn: {
                              readonly: disabled,
                              size: 'large',
                              text: t(props.browseText),
                              variant: 'tonal',
                            },
                          }}
                        >
                          { slots.browse({ props: { onClick: onClickBrowse } }) }
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
            </>
          ))}

          <VOverlay
            modelValue={ isDragging.value }
            contained
            scrim={ props.scrim }
          />

          { slots.input?.() }
        </VSheet>
      )
    })

    return forwardRefs({}, vSheetRef)
  },
})

export type VFileUploadDropzone = InstanceType<typeof VFileUploadDropzone>
