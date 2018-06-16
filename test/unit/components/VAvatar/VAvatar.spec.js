import VAvatar from '@/components/VAvatar'
import { test } from '@/test'

test('VAvatar.vue', ({ mount, functionalContext }) => {
  it('should have an v-avatar class', () => {
    const wrapper = mount(VAvatar, functionalContext())

    expect(wrapper.classes()).toContain('v-avatar')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should have an proper class with tile prop', () => {
    const wrapper = mount(VAvatar, functionalContext({
      props: {
        tile: true
      }
    }))

    expect(wrapper.classes()).toContain('v-avatar--tile')
  })

  it('should accept custom or no class declarations', () => {
    const wrapper = mount(VAvatar, functionalContext())
    const wrapperTwo = mount(VAvatar, functionalContext({
      class: 'active'
    }))
    const wrapperThree = mount(VAvatar, functionalContext({
      class: ['active']
    }))
    const wrapperFour = mount(VAvatar, functionalContext({
      class: { 'active': true }
    }))

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapperTwo.classes()).toContain('active')
    expect(wrapperThree.classes()).toContain('active')
    expect(wrapperFour.classes()).toContain('active')
  })
})
