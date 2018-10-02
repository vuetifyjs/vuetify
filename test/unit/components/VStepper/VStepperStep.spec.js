import { test } from '@/test'
import VStepperStep from '@/components//VStepper/VStepperStep'

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

  it('should accept a custom css color', async () => {
    const wrapper = mount(VStepperStep, {
      attachToDocument: true,
      propsData: {
        color: '#aabbcc',
        complete: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect('[Vue warn]: Injection "stepClick" not found').toHaveBeenWarned()
  })
})
