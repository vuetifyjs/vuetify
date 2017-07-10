import Chip from '~components/chips/Chip'
import { test } from '~util/testing'

test('Chip.js', ({ mount }) => {
  it('should have a chip class', () => {
    const wrapper = mount(Chip)

    expect(wrapper.hasClass('chip')).toBe(true)
  })
})
