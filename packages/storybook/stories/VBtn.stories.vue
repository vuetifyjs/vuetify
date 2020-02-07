<script>
  import { text, boolean } from '@storybook/addon-knobs'

  export default {
    title: 'VBtn',
    parameters: {
      eyes: {
        variations: ['dark']
      }
    }
  }
</script>

<story name="asDefault">
  <v-btn>default button</v-btn>
</story>

<story
  name="asDisabled"
  :props="{
    text: { default: text('Text', 'foobar') },
    disabled: { default: boolean('Disabled', true) }
  }"
>
  <v-btn :disabled="disabled">{{ text }}</v-btn>
</story>
