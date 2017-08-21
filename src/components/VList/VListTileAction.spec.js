import { VListTileAction } from '~components/VList'
import { test } from '~util/testing'

test('VListTileAction.js', ({ mount, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VListTileAction, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })
})
