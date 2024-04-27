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
import { IconValue } from '@/composables/icons'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { genericComponent, humanReadableFileSize, only, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'

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
  multiple: Boolean,
  showSize: Boolean,

  ...makeDelayProps(),
  ...makeDensityProps(),
  ...only(makeVDividerProps({
    length: 150,
  }), ['length', 'thickness', 'opacity']),
  ...makeVSheetProps(),
}, 'VFileUpload')

export const VFileUpload = genericComponent()({
  name: 'VFileUpload',

  props: makeVFileUploadProps(),

  emits: {
    'update:modelValue': (files: File[]) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const { densityClasses } = useDensity(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      props.modelValue,
      val => wrapInArray(val),
      val => (props.multiple || Array.isArray(props.modelValue)) ? val : val[0],
    )

    const dragOver = shallowRef(false)
    const vSheetRef = ref<InstanceType<typeof VSheet> | null>(null)

    const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined)
    const title = computed(() => {
      return props.title.startsWith('$vuetify')
        ? t(props.title)
        : props.title
    })

    onMounted(() => {
      vSheetRef.value?.$el.addEventListener('dragover', onDragOver)
      vSheetRef.value?.$el.addEventListener('drop', onDrop)
    })

    onUnmounted(() => {
      vSheetRef.value?.$el.removeEventListener('dragover', onDragOver)
      vSheetRef.value?.$el.removeEventListener('drop', onDrop)
    })

    function onDragOver (e: DragEvent) {
      e.preventDefault()
      e.stopImmediatePropagation()
      dragOver.value = true
    }

    function onDragLeave (e: DragEvent) {
      e.preventDefault()
      dragOver.value = false
    }

    function onDrop (e: DragEvent) {
      e.preventDefault()
      e.stopImmediatePropagation()
      dragOver.value = false

      const files = Array.from(e.dataTransfer?.files ?? [])

      if (!files.length) return

      if (!props.multiple) {
        model.value = [files[0]]

        return
      }

      for (const file of files) {
        if (!model.value.some(f => f.name === file.name)) {
          model.value.push(file)
        }
      }
    }

    function onClickRemove (index: number) {
      model.value = model.value.filter((_, i) => i !== index)
    }

    useRender(() => {
      const hasTitle = !!(slots.title || title.value)
      const hasIcon = !!(slots.icon || props.icon)
      const cardProps = VSheet.filterProps(props)
      const dividerProps = VDivider.filterProps(props)

      return (
        <>
          <VSheet
            ref={ vSheetRef }
            { ...cardProps }
            class={[
              'v-file-upload',
              {
                'v-file-upload--dragging': dragOver.value,
              },
              densityClasses.value,
            ]}
            onDragleave={ onDragLeave }
            onDragover={ onDragOver }
            onDrop={ onDrop }
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
                    { slots.icon() }
                  </VDefaultsProvider>
                )}
              </div>
            )}

            { hasTitle && (
              <div key="title" class="v-file-upload-title">
                { slots.title?.() ?? title.value }
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

                <VBtn
                  text={ t(props.browseText) }
                  variant="tonal"
                  size="large"
                />

                { props.subtitle && (
                  <div class="v-file-upload-subtitle">
                    { props.subtitle }
                  </div>
                )}
              </>
            )}

            <VOverlay
              model-value={ dragOver.value }
              contained
            />
          </VSheet>

          { model.value.length > 0 && (
            <div class="v-file-upload-items">
              { model.value.map((file, i) => (
                <VFileUploadItem
                  key={ i }
                  title={ file.name }
                  subtitle={ props.showSize ? humanReadableFileSize(file.size, base.value) : undefined }
                  onClick:remove={ () => onClickRemove(i) }
                />
              ))}
            </div>
          )}
        </>
      )
    })
  },
})

export type VFileUpload = InstanceType<typeof VFileUpload>
