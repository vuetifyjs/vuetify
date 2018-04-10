import { test } from '@util/testing'
import VStepperStep from './VStepperStep'

test('VStepperStep.js', ({ mount }) => {
  it('should accept a custom color', async () => {
    const wrapper = mount(VStepperStep, {
      attachToDocument: true,
      propsData: {
        color: 'pink',
        complete: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('[Vue warn]: Injection "stepClick" not found').toHaveBeenWarned()
  })
})
