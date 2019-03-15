// Components
import VExpansionPanelContent from '../VExpansionPanelContent'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'

describe('VExpansionPanelContent', () => {
  type Instance = InstanceType<typeof VExpansionPanelContent>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VExpansionPanelContent, {
        ...options
      })
    }
  })

  it('should work', () => {
    //
  })
})
