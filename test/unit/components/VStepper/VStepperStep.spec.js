import { test } from '@/test'
import VStepperStep from '@/components/VStepper/VStepperStep'

test('VStepperStep.js', ({ mount }) => {
  // TODO: enable once dev merges to master
  it.skip('should accept a custom color', async () => {
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
