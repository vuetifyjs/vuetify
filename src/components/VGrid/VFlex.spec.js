import { test } from '~util/testing'
import Grid from '~components/grid'

const id = 'flex'

test('VFlex', ({ mount, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(Grid.VFlex, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom id and match snapshot', () => {
    const wrapper = mount(Grid.VFlex, functionalContext({
      propsData: {
        id
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })
})
