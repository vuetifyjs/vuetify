import { test } from '~util/testing'
import Grid from '~components/grid'

const id = 'layout'

test('VLayout', ({ mount, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(Grid.VLayout, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom id and match snapshot', () => {
    const wrapper = mount(Grid.VLayout, functionalContext({
      propsData: {
        id
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })
})
