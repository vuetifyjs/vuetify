// Components
import { VFileUploadKey } from './VFileUploadDropzone'
import { VFileUploadItem } from './VFileUploadItem'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { makeVListProps, VList } from '@/components/VList/VList'

// Utilities
import { inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VFileUploadListSlots = {
  default: {
    files: readonly File[]
    onClickRemove: (index: number) => void
  }
  item: {
    file: File
    props: { 'onClick:remove': () => void }
  }
}

export const makeVFileUploadListProps = propsFactory({
  clearable: Boolean,
  showSize: Boolean,
  files: {
    type: Array as PropType<File[]>,
    default: undefined,
  },

  ...makeVListProps({
    border: false,
    elevation: 0,
    lines: false as const,
  }),
}, 'VFileUploadList')

export const VFileUploadList = genericComponent<VFileUploadListSlots>()({
  name: 'VFileUploadList',

  props: makeVFileUploadListProps(),

  setup (props, { slots }) {
    const context = inject(VFileUploadKey, null)

    useRender(() => {
      const files = props.files ?? context?.files.value ?? []
      const disabled = context?.disabled.value ?? props.disabled
      const listProps = VList.filterProps(props)

      if (!slots.default && !files.length) return (<></>)

      return (
        <VList
          { ...listProps }
          disabled={ disabled }
          class={[
            'v-file-upload-list',
            props.class,
          ]}
          style={ props.style }
          bgColor="transparent"
        >
          { slots.default?.({ files, onClickRemove: (i: number) => context?.onClickRemove(i) }) ?? files.map((file, index) => {
            const slotProps = {
              file,
              props: {
                'onClick:remove': () => context?.onClickRemove(index),
              },
            }

            return (
              <VDefaultsProvider
                key={ index }
                defaults={{
                  VFileUploadItem: {
                    file,
                    clearable: props.clearable,
                    disabled,
                    showSize: props.showSize,
                    variant: 'flat',
                  },
                }}
              >
                { slots.item?.(slotProps) ?? (
                  <VFileUploadItem
                    key={ index }
                    onClick:remove={ () => context?.onClickRemove(index) }
                  />
                )}
              </VDefaultsProvider>
            )
          })}
        </VList>
      )
    })
  },
})

export type VFileUploadList = InstanceType<typeof VFileUploadList>
