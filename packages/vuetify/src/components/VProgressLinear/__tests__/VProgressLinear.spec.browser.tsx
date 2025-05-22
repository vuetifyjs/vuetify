// Components
import { VProgressLinear } from '../VProgressLinear'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { render, userEvent } from '@test'
import { defineComponent, ref } from 'vue'

describe('VProgressLinear', () => {
  it('supports modelValue prop', () => {
    const { container } = render(() => (
      <div style="width: 100px;">
        <VProgressLinear modelValue={ 25 } />
      </div>
    ))

    const determinate = container.querySelector('.v-progress-linear__determinate')
    expect(determinate).toHaveStyle({ width: '25%' })
  })

  it('supports RTL mode', () => {
    const { container } = render(() => (
      <div style="width: 100px;">
        <VLocaleProvider rtl>
          <VProgressLinear modelValue={ 25 } />
        </VLocaleProvider>
      </div>
    ))

    const determinate = container.querySelector('.v-progress-linear__determinate')
    expect(determinate).toHaveStyle({ width: '25%' })
  })

  it('supports reverse prop', () => {
    const { container } = render(() => (
      <div style="width: 100px;">
        <VProgressLinear modelValue={ 25 } reverse />
      </div>
    ))

    const determinate = container.querySelector('.v-progress-linear__determinate')
    expect(determinate).toHaveStyle({ width: '25%' })
  })

  it('supports reverse prop and RTL mode together', () => {
    const { container } = render(() => (
      <div style="width: 100px;">
        <VLocaleProvider rtl>
          <VProgressLinear modelValue={ 25 } reverse />
        </VLocaleProvider>
      </div>
    ))

    const determinate = container.querySelector('.v-progress-linear__determinate')
    expect(determinate).toHaveStyle({ width: '25%' })
  })

  it('supports color props', () => {
    const { container } = render(() => (
      <div style="width: 100px;">
        <VProgressLinear modelValue={ 25 } color="secondary" bgColor="error" />
      </div>
    ))

    const determinate = container.querySelector('.v-progress-linear__determinate')
    expect(determinate).toHaveClass('bg-secondary')

    const background = container.querySelector('.v-progress-linear__background')
    expect(background).toHaveClass('bg-error')
  })

  it('supports indeterminate prop', () => {
    const { container } = render(() => (
      <div style="width: 100px;">
        <VProgressLinear modelValue={ 25 } indeterminate />
      </div>
    ))

    const indeterminate = container.querySelector('.v-progress-linear__indeterminate')
    expect(indeterminate).not.toBeNull()
  })

  it('supports bufferValue prop', () => {
    const { container } = render(() => (
      <div style="width: 100px;">
        <VProgressLinear modelValue={ 25 } stream bufferValue={ 50 } />
      </div>
    ))

    const buffer = container.querySelector('.v-progress-linear__buffer')
    expect(buffer).toHaveStyle({ width: '50%' })
  })

  it('supports height prop', () => {
    const { container } = render(() => (
      <div style="width: 100px;">
        <VProgressLinear modelValue={ 25 } height={ 50 } />
      </div>
    ))

    const progressLinear = container.querySelector('.v-progress-linear')
    expect(progressLinear).toHaveStyle({ height: '50px' })
  })

  it('supports active prop', () => {
    const { container } = render(() => (
      <div style="width: 100px;">
        <VProgressLinear modelValue={ 25 } active={ false } />
      </div>
    ))

    const progressLinear = container.querySelector('.v-progress-linear')
    expect(progressLinear).toHaveStyle({ height: '0px' })
  })

  it('supports clickable prop', async () => {
    const { container } = render(defineComponent({
      setup () {
        const model = ref(0)
        return () => (
          <div style="width: 100px;">
            <VProgressLinear v-model={ model.value } clickable />
          </div>
        )
      },
    }))

    const progressLinear = container.querySelector('.v-progress-linear')
    if (progressLinear) {
      // Click in the middle
      await userEvent.click(progressLinear, { clientX: 50 })

      const determinate = container.querySelector('.v-progress-linear__determinate')
      expect(determinate).toHaveStyle({ width: '50%' })
    }
  })

  it('supports default slot', () => {
    const { container } = render(() => (
      <div style="width: 100px;">
        <VProgressLinear modelValue={ 25 } height={ 20 }>
          {{
            default: (props: any) => <div>{ props.value }%</div>,
          }}
        </VProgressLinear>
      </div>
    ))

    const content = container.querySelector('.v-progress-linear__content')
    expect(content).not.toBeNull()
    expect(content).toHaveTextContent('25%')
  })
})
