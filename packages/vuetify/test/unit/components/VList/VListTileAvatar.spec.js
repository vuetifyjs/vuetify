import { VListTileAvatar } from '@/components/VList'
import { test } from '@/test'

test('VListTileAvatar.js', ({ mount, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VListTileAvatar, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })
})
