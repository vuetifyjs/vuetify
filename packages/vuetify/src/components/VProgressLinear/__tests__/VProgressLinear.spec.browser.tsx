// Components
import { VProgressLinear } from '../VProgressLinear'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { render, screen, showcase, userEvent, wait } from '@test'
import { ref } from 'vue'

const stories = {
  'With value': <VProgressLinear modelValue="25" />,
  'With height': <VProgressLinear modelValue="25" height="50" />,
  'With reverse': <VProgressLinear modelValue="25" reverse />,
  'With rtl': (
    <VLocaleProvider rtl>
      <VProgressLinear modelValue="25" />
    </VLocaleProvider>
  ),
  'With rtl and reverse': (
    <VLocaleProvider rtl>
      <VProgressLinear modelValue="25" reverse />
    </VLocaleProvider>
  ),
  'With colors': <VProgressLinear modelValue="25" color="secondary" bgColor="error" />,
  Hidden: <VProgressLinear modelValue="25" active={ false } />,
  'With slot': (
    <VProgressLinear modelValue="25" height="20">
      {{
        default: props => <div>{ props.value }%</div>,
      }}
    </VProgressLinear>
  ),
}

describe('VProgressLinear', () => {
  it('supports clickable prop', async () => {
    const model = ref(0)
    render(() => (
      <VProgressLinear
        v-model={ model.value }
        style="width: 100px"
        clickable
      />
    ))

    await userEvent.click(screen.getByCSS('.v-progress-linear'))
    expect(model.value).toBe(50)
    await wait(300)
    expect(screen.getByCSS('.v-progress-linear__determinate').clientWidth).toBe(50)
  })

  showcase({ stories })
})
