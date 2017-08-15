import { test } from '~util/testing'
import { VCardTitle } from '~components/VCard'

test('VCardTitle.js', ({ mount, functionalContext }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VCardTitle, functionalContext())

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with specific padding applied', () => {
    const wrapper = mount(VCardTitle, functionalContext({
      props: {
        'primary-title': true
      }
    }))

    expect(wrapper.html()).toMatchSnapshot()
  })
})
