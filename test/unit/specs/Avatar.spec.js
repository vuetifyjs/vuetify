import Vue from 'vue/dist/vue.common'
import { mount } from 'avoriaz'
import { Avatar } from 'src/components/avatars'

describe('Avatar.vue', () => {

  it('should have an avatar class', () => {
    const context = {
      props: {}
    }

    const wrapper = mount(Avatar, { context })

    expect(wrapper.hasClass('avatar')).toBe(true)
  })
})
