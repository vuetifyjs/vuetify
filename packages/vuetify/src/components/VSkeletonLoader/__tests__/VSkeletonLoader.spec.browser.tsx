// Components
import { VSkeletonLoader } from '../VSkeletonLoader'

// Utilities
import { showcase } from '@test'

const stories = {
  Boilerplate: <VSkeletonLoader boilerplate type="article" />,
  Color: <VSkeletonLoader boilerplate color="primary" type="article" />,
  Table: <VSkeletonLoader boilerplate type="table" />,
  'Custom type': <VSkeletonLoader boilerplate type="product" types={{ product: 'image, heading, subtitle, actions' }} />,
}

describe('VSkeletonLoader', () => {
  showcase({ stories })
})
