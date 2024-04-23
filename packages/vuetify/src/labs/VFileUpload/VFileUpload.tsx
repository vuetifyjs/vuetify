// Styles
import './VFileUpload.sass'

// Components
import { VBtn } from '@/components/VBtn/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { makeVDividerProps, VDivider } from '@/components/VDivider/VDivider'
import { VIcon } from '@/components/VIcon/VIcon'
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { IconValue } from '@/composables/icons'
import { useLocale } from '@/composables/locale'

// Utilities
import { computed } from 'vue'
import { genericComponent, only, propsFactory, useRender } from '@/util'

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

  ...makeDensityProps(),
  ...only(makeVDividerProps({
    length: 150,
  }), ['length', 'thickness', 'opacity']),
  ...makeVSheetProps(),
}, 'VFileUpload')

export const VFileUpload = genericComponent()({
  name: 'VFileUpload',

  props: makeVFileUploadProps(),

  setup (props, { slots }) {
    const { t } = useLocale()
    const { densityClasses } = useDensity(props)

    const title = computed(() => {
      return props.title.startsWith('$vuetify')
        ? t(props.title)
        : props.title
    })
    useRender(() => {
      const hasTitle = !!(slots.title || title.value)
      const hasIcon = !!(slots.icon || props.icon)
      const cardProps = VSheet.filterProps(props)
      const dividerProps = VDivider.filterProps(props)

      return (
        <VSheet
          { ...cardProps }
          class={[
            'v-file-upload',
            densityClasses.value,
          ]}
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
        </VSheet>
      )
    })
  },
})

export type VFileUpload = InstanceType<typeof VFileUpload>
