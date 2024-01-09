/// <reference types="../../../../types/cypress" />

import { VSwitch } from '../VSwitch'
import { generate, gridOn } from '@/../cypress/templates'

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

describe('VSwitch', () => {
  describe('Showcase', () => {
    generate({ stories, props: {}, component: VSwitch })
  })
})
