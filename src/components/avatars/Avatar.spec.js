import { Avatar } from '~components/avatars'
import { test } from '~util/testing'

test('Avatar.vue', ({ mount, functionalContext }) => {
  it('should have an avatar class', () => {
    const wrapper = mount(Avatar, functionalContext())

    expect(wrapper.hasClass('avatar')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
