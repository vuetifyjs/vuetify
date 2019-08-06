import { text, boolean } from '@storybook/addon-knobs'

export default () => ({
  props: {
    text: {
      default: text('Text', 'Goodbye!')
    },
    color: {
      default: text('Color', 'primary')
    },
    dark: {
      default: boolean('Dark', false)
    }
  },
  template: '<v-btn :color="color" :dark="dark">{{ text }}</v-btn>'
})
