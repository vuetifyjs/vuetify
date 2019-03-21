// Components
import VBtnToggle from '../VBtnToggle'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'

// Types
import { ExtractVue } from '../../../util/mixins'

describe('VBtnToggle.ts', () => {
  type Instance = ExtractVue<typeof VBtnToggle>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VBtnToggle, {
        ...options,
        mocks: {
          $vuetify: {
            lang: {
              t: (val: string) => val
            }
          }
        }
      })
    }
  })

  it('should work', () => {
    const wrapper = mountFunction()
    expect(wrapper).toBeTruthy()
  })
})
