import { VSwitch } from '../VSwitch'

// Utilities
import { gridOn, render, screen, showcase, waitIdle } from '@test'
import { ref } from 'vue'

const contextColor = 'rgb(0, 0, 255)'
const color = 'rgb(255, 0, 0)'
const thumbColor = 'rgb(0, 255, 0)'
const sizes = ['x-small', 'small', 'default', 'large', 'x-large'] as const

const stories = {
  'Explicit color': gridOn([undefined], [true, false], (_, active) => (
    <div style={{ color: contextColor }}>
      <VSwitch modelValue={ active } color={ color } />
    </div>
  )),
  'Inherited color': gridOn([undefined], [true, false], (_, active) => (
    <div style={{ color: contextColor }}>
      <VSwitch modelValue={ active } />
    </div>
  )),
  'No color': gridOn([undefined], [true, false], (_, active) => (
    <VSwitch modelValue={ active } />
  )),
  'Inset tonal': gridOn([color, undefined], [true, false], (color, active) => (
    <VSwitch modelValue={ active } color={ color } inset="tonal" />
  )),
  'Inset material': gridOn([color, undefined], [true, false], (color, active) => (
    <VSwitch modelValue={ active } color={ color } inset="material" />
  )),
  'Inset square': gridOn([color, undefined], [true, false], (color, active) => (
    <VSwitch modelValue={ active } color={ color } inset="square" />
  )),
  'Icons (no color)': gridOn([false, 'material'] as const, [true, false], (inset, active) => (
    <VSwitch modelValue={ active } inset={ inset } trueIcon="$complete" falseIcon="$close" />
  )),
  'Icons (color)': gridOn([false, 'tonal', 'material'] as const, [true, false], (inset, active) => (
    <VSwitch modelValue={ active } color={ color } inset={ inset } trueIcon="$complete" falseIcon="$close" />
  )),
  'Thumb color': gridOn([false, 'tonal', 'material'] as const, [true, false], (inset, active) => (
    <VSwitch modelValue={ active } color={ color } inset={ inset } thumbColor={ thumbColor } />
  )),
  Sizes: gridOn(sizes, [true, false], (size, active) => (
    <VSwitch modelValue={ active } color={ color } size={ size } />
  )),
}
const props = {
  loading: [true],
  indeterminate: [true],
}

describe('VSwitch', () => {
  showcase({ stories, props, component: VSwitch })

  it('should focus and blur from a ref', async () => {
    const cmp = ref<any>()

    render(() => <VSwitch ref={ cmp } />)
    await waitIdle()

    cmp.value.focus()
    expect(document.activeElement).toBe(screen.getByCSS('input[type="checkbox"]'))

    cmp.value.blur()
    expect(document.activeElement).not.toBe(screen.getByCSS('input[type="checkbox"]'))
  })

  it('should expose the VInput api it wraps and not shadow it', async () => {
    const cmp = ref<any>()

    render(() => <VSwitch ref={ cmp } />)
    await waitIdle()

    for (const key of ['focus', 'blur', 'reset', 'resetValidation', 'validate']) {
      expect(cmp.value[key], key).toBeTypeOf('function')
    }

    expect('isValid' in cmp.value).toBe(true)
    expect(cmp.value.validate()).toBeInstanceOf(Promise)
  })
})
