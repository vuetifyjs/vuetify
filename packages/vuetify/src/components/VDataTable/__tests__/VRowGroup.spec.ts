import VRowGroup from '../VRowGroup'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'

describe('VRowGroup.ts', () => {
  type Instance = InstanceType<typeof VRowGroup>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VRowGroup, options)
    }
  })

  it('should render with "column.summary" slot', () => {
    const wrapper = mountFunction({
      slots: {
        'column.summary': '<div></div>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render with "row.summary" slot', () => {
    const wrapper = mountFunction({
      slots: {
        'row.summary': '<div></div>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
