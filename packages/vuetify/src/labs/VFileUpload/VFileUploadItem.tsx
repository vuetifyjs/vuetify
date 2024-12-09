// Components
import { VAvatar } from '@/components/VAvatar/VAvatar'
import { VBtn } from '@/components/VBtn/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { makeVListItemProps, VListItem } from '@/components/VList/VListItem'

// Utilities
import { computed, ref, watchEffect } from 'vue'
import { genericComponent, humanReadableFileSize, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VListItemSlots } from '@/components/VList/VListItem'

export type VFileUploadItemSlots = {
  clear: {
    props: { onClick: () => void }
  }
} & VListItemSlots

export const makeVFileUploadItemProps = propsFactory({
  clearable: Boolean,
  file: {
    type: Object as PropType<File>,
    default: null,
  },
  fileIcon: {
    type: String,
    // TODO: setup up a proper aliased icon
    default: 'mdi-file-document',
  },
  showSize: Boolean,

  ...makeVListItemProps({
    border: true,
    rounded: true,
    lines: 'two' as const,
  }),
}, 'VFileUploadItem')

export const VFileUploadItem = genericComponent<VFileUploadItemSlots>()({
  name: 'VFileUploadItem',

  props: makeVFileUploadItemProps(),

  emits: {
    'click:remove': () => true,
    click: (e: MouseEvent | KeyboardEvent) => true,
  },

  setup (props, { emit, slots }) {
    const preview = ref()
    const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined)

    function onClickRemove () {
      emit('click:remove')
    }

    watchEffect(() => {
      preview.value = props.file?.type.startsWith('image') ? URL.createObjectURL(props.file) : undefined
    })

    useRender(() => {
      const listItemProps = VListItem.filterProps(props)

      return (
        <VListItem
          { ...listItemProps }
          title={ props.title ?? props.file?.name }
          subtitle={ props.showSize ? humanReadableFileSize(props.file?.size, base.value) : props.file?.type }
          class="v-file-upload-item"
        >
          {{
            ...slots,
            prepend: slotProps => (
              <>
                { !slots.prepend ? (
                  <VAvatar
                    icon={ props.fileIcon }
                    image={ preview.value }
                    rounded
                  />
                ) : (
                  <VDefaultsProvider
                    defaults={{
                      VAvatar: {
                        image: preview.value,
                        icon: !preview.value ? props.fileIcon : undefined,
                        rounded: true,
                      },
                    }}
                  >
                    { slots.prepend?.(slotProps) ?? (
                      <VAvatar />
                    )}
                  </VDefaultsProvider>
                )}
              </>
            ),
            append: slotProps => (
              <>
                { props.clearable && (
                  <>
                    { !slots.clear ? (
                      <VBtn
                        icon="$clear"
                        density="comfortable"
                        variant="text"
                        onClick={ onClickRemove }
                      />
                    ) : (
                      <VDefaultsProvider
                        defaults={{
                          VBtn: {
                            icon: '$clear',
                            density: 'comfortable',
                            variant: 'text',
                          },
                        }}
                      >
                        { slots.clear?.({
                          ...slotProps,
                          props: { onClick: onClickRemove },
                        }) ?? (<VBtn />)}
                      </VDefaultsProvider>
                    )}
                  </>
                )}

                { slots.append?.(slotProps) }
              </>
            ),
          }}
        </VListItem>
      )
    })
  },
})

export type VFileUploadItem = InstanceType<typeof VFileUploadItem>
