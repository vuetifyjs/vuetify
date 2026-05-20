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
import { inject, ref, shallowRef, toRef } from 'vue'
import { genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'

export interface VFileUploadContext {
  files: Ref<readonly File[]>
  disabled: Ref<boolean>
  readonly: Ref<boolean>
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
  loader: never
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
  readonly: Boolean,
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
    const { handleDrop, hasFilesOrFolders } = useFileDrop()
    const context = inject(VFileUploadKey, null)
    const vSheetRef = ref<VSheet>()
    const isDragging = shallowRef(false)
    const isDisabled = toRef(() => context?.disabled.value ?? props.disabled)
    const isReadonly = toRef(() => context?.readonly.value ?? props.readonly)
    const isInteractive = toRef(() => !isDisabled.value && !isReadonly.value)

    function onDragover (e: DragEvent) {
      if (!isInteractive.value) return
      e.preventDefault()
      e.stopImmediatePropagation()
      isDragging.value = true
    }

    function onDragleave (e: DragEvent) {
      e.preventDefault()
      const container = e.currentTarget as HTMLElement
      if (!container.contains(e.relatedTarget as Node)) {
        isDragging.value = false
      }
    }

    async function onDrop (e: DragEvent) {
      e.preventDefault()
      e.stopImmediatePropagation()

      isDragging.value = false

      if (!isInteractive.value || !hasFilesOrFolders(e)) return

      const files = await handleDrop(e)
      if (context) {
        context.onDrop(files)
      } else {
        emit('drop', files)
      }
    }

    function onClickBrowse () {
      if (!isInteractive.value) return
      if (context) {
        context.onClickBrowse()
      } else {
        emit('click:browse')
      }
    }

    function onKeydown (e: KeyboardEvent) {
      if (!isInteractive.value) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClickBrowse()
      }
    }

    function onClickRemove (index: number) {
      if (!isInteractive.value) return
      if (context) {
        context.onClickRemove(index)
      } else {
        emit('click:remove', index)
      }
    }

    async function onPaste (e: ClipboardEvent) {
      if (!isInteractive.value || !hasFilesOrFolders(e)) return

      e.preventDefault()
      const files = await handleDrop(e)
      if (!files.length) return

      if (context) {
        context.onDrop(files)
      } else {
        emit('drop', files)
      }
    }

    useRender(() => {
      const modelValue = context?.files.value ?? props.modelValue
      const disabled = isDisabled.value
      const readonly = isReadonly.value
      const interactive = isInteractive.value
      const error = context?.error.value || props.error
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
          tabindex={ disabled ? -1 : 0 }
          { ...sheetProps }
          class={[
            'v-file-upload-dropzone',
            {
              'v-file-upload-dropzone--clickable': !hasBrowse,
              'v-file-upload-dropzone--disabled': disabled,
              'v-file-upload-dropzone--readonly': readonly,
              'v-file-upload-dropzone--dragging': isDragging.value,
              'v-file-upload-dropzone--has-files': hasFiles,
              'v-file-upload-dropzone--inset': isInset,
              'v-file-upload-dropzone--error': error,
            },
            densityClasses.value,
            props.class,
          ]}
          style={ props.style }
          onDragleave={ onDragleave }
          onDragover={ onDragover }
          onDrop={ onDrop }
          onPaste={ onPaste }
          onClick={ !hasBrowse && !(isInset && hasFiles) ? onClickBrowse : undefined }
          onKeydown={ onKeydown }
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
                        clearable: props.clearable && !readonly,
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
                          clearable: props.clearable && !readonly,
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

              <VDivider />

              <div class="v-file-upload-inset__action">
                { !slots.browse ? (
                  <VBtn
                    readonly={ !interactive }
                    text={ t(props.browseText) }
                    variant="text"
                    onClick={ onClickBrowse }
                  />
                ) : (
                  <VDefaultsProvider
                    defaults={{
                      VBtn: {
                        readonly: !interactive,
                        text: t(props.browseText),
                        variant: 'text',
                      },
                    }}
                  >
                    { slots.browse({ props: { onClick: onClickBrowse } }) }
                  </VDefaultsProvider>
                )}
              </div>
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
                  { hasBrowse && (
                    <>
                      <div key="upload-divider" class="v-file-upload-divider">
                        { slots.divider?.() ?? (
                          <VDivider { ...dividerProps }>
                            { t(props.dividerText) }
                          </VDivider>
                        )}
                      </div>
                      { !slots.browse ? (
                        <VBtn
                          readonly={ !interactive }
                          size="large"
                          text={ t(props.browseText) }
                          variant="tonal"
                          onClick={ onClickBrowse }
                        />
                      ) : (
                        <VDefaultsProvider
                          defaults={{
                            VBtn: {
                              readonly: !interactive,
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

          { slots.loader?.() }
        </VSheet>
      )
    })

    return forwardRefs({}, vSheetRef)
  },
})

export type VFileUploadDropzone = InstanceType<typeof VFileUploadDropzone>
