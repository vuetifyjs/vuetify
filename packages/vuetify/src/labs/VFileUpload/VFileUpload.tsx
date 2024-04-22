// Components
import { VCard } from '@/components/VCard'
import { makeVCardProps } from '@/components/VCard/VCard'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVFileUploadProps = propsFactory({
  ...makeVCardProps(),
}, 'VFileUpload')

export const VFileUpload = genericComponent()({
  name: 'VFileUpload',

  props: makeVFileUploadProps(),

  setup (props) {
    useRender(() => {
      const cardProps = VCard.filterProps(props)

      return (
        <VCard
          { ...cardProps }
        >

        </VCard>
      )
    })
  },
})

export type VFileUpload = InstanceType<typeof VFileUpload>
