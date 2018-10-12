import { test } from '@/test'
import VStepperStep from '@/components//VStepper/VStepperStep'

const tip = '[Vuetify] The v-stepper-step component must be used inside a v-stepper'
const warning = '[Vue warn]: Injection "stepClick" not found'

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
    expect(warning).toHaveBeenWarned()
    expect(tip).toHaveBeenTipped()
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
    expect(warning).toHaveBeenWarned()
    expect(tip).toHaveBeenTipped()
  })
})
