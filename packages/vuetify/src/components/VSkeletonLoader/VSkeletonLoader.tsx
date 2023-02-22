
// Styles
import './VSkeletonLoader.sass'

// Components
import { VSkeletonBone } from './VSkeletonBone'

// Utilities
import { genericComponent, useRender } from '@/util'

const rootTypes = ['card']

export const VSkeletonLoader = genericComponent()({
  name: 'VSkeletonLoader',

  props: {
    type: {
      type: String,
      validator: (val: string) => rootTypes.includes(val),
      default: 'card',
    },
  },

  setup (props) {
    useRender(() => (
      <div
        class={[
          'v-skeleton-loader',
        ]}
      >
        { props.type === 'card' && (
          <>
            <VSkeletonBone type="image" />

            <VSkeletonBone type="sheet">
              <VSkeletonBone type="heading" />
            </VSkeletonBone>
          </>
        ) }
      </div>
    ))

    return {}
  },
})
