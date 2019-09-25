// Components
import VBtnToggle from '../VBtnToggle'

// Utilities
import {
  mount,
  Wrapper,
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
      })
    }
  })

  it('should not apply background color with group', () => {
    const wrapper = mountFunction({
      propsData: { backgroundColor: 'primary' },
    })

    expect(wrapper.element.classList.contains('primary')).toBeTruthy()

    wrapper.setProps({ group: true })

    expect(wrapper.element.classList.contains('primary')).toBeFalsy()
  })
})
