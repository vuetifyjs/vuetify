import { VSwitch } from '../VSwitch'

// Utilities
import { generate, gridOn } from '@test'

const contextColor = 'rgb(0, 0, 255)'
const color = 'rgb(255, 0, 0)'
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
}
const props = {
  loading: [true],
  inset: [true],
  indeterminate: [true],
}

describe('VSwitch', () => {
  describe('Showcase', () => {
    generate({ stories, props, component: VSwitch })
  })
})
