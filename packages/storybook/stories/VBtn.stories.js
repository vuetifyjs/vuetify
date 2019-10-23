// Utilities
import { storyFactory } from './util/helpers'
import { text, boolean } from '@storybook/addon-knobs'

export default { title: 'VBtn' }

const story = storyFactory()

export const asDefault = () => story({
  props: {
    isDisabled: {
      default: boolean('Disabled', false)
    },
    text: {
      default: text('Text', 'Default Button')
    },
  },
  template: `<v-btn :disabled="isDisabled">{{ text }}</v-btn>`
})
