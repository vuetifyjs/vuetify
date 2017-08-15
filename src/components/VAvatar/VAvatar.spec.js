import VAvatar from '~components/VAvatar'
import { test } from '~util/testing'

test('VAvatar.vue', ({ mount, functionalContext }) => {
  it('should have an avatar class', () => {
    const wrapper = mount(VAvatar, functionalContext())

    expect(wrapper.hasClass('avatar')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
