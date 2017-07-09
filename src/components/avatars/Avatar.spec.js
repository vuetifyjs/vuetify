import { mount } from 'avoriaz'
import { Avatar } from '~components/avatars'
import { functionalContext } from '~util/testing'

describe('Avatar.vue', () => {
  it('should have an avatar class', () => {
    const wrapper = mount(Avatar, functionalContext())

    expect(wrapper.hasClass('avatar')).toBe(true)
  })
})
