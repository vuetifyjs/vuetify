import Vue from 'vue'
import { test } from '~util/testing'
import { mount } from 'avoriaz'
import Applicationable from '~mixins/applicationable'

test('applicationable.js', () => {
  it('should update application on mount', async () => {
    const updateApplication = jest.fn()
    const wrapper = mount({
      mixins: [ Applicationable ],
      methods: { updateApplication },
      render: h => h('div')
    })

    expect(updateApplication.mock.calls).toHaveLength(1)
  })

  it('should update application on app prop change', async () => {
    const updateApplication = jest.fn()
    const wrapper = mount({
      mixins: [ Applicationable ],
      methods: { updateApplication },
      render: h => h('div')
    })

    wrapper.setProps({ app: true })
    expect(updateApplication.mock.calls).toHaveLength(2)
  })
})
