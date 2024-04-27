// Components
import { VBtn } from '@/components/VBtn/VBtn'
import { VIcon } from '@/components/VIcon/VIcon'
import { makeVListItemProps, VListItem } from '@/components/VList/VListItem'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VListItemSlots } from '@/components/VList/VListItem'

export const makeVFileUploadItemProps = propsFactory({

  ...makeVListItemProps({
    border: true,
    rounded: true,
    lines: 'two' as const,
    slim: true,
  }),
}, 'VFileUploadItem')

export const VFileUploadItem = genericComponent<VListItemSlots>()({
  name: 'VFileUploadItem',

  props: makeVFileUploadItemProps(),

  emits: {
    'click:remove': () => true,
  },

  setup (props, { emit, slots }) {
    function onClickRemove () {
      emit('click:remove')
    }

    useRender(() => {
      const listItemProps = VListItem.filterProps(props)

      return (
        <VListItem
          { ...listItemProps }
          class="v-file-upload-item"
        >
          {{
            ...slots,
            prepend: slotProps => slots.prepend?.(slotProps) ?? (
              <VIcon size="32">mdi-file-document</VIcon>
            ),
            append: slotProps => slots.append?.(slotProps) ?? (
              <VBtn
                icon="$clear"
                density="comfortable"
                variant="text"
                onClick={ onClickRemove }
              />
            ),
          }}
        </VListItem>
      )
    })
  },
})

export type VFileUploadItem = InstanceType<typeof VFileUploadItem>
