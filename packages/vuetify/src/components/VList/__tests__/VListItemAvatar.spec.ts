// Components
import VListItemAvatar from '../VListItemAvatar'

// Utilities
import {
  mount,
  Wrapper,
} from '@vue/test-utils'

// Types
import { ExtractVue } from '../../../util/mixins'

describe('VListItemAvatar.ts', () => {
  type Instance = ExtractVue<typeof VListItemAvatar>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VListItemAvatar, {
        ...options,
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
