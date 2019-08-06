import { storiesOf } from '@storybook/vue';

storiesOf('VIcon', module)
  .add('size', () => `
    <div>
      <v-icon x-small>mdi-home</v-icon>
      <v-icon small>mdi-home</v-icon>
      <v-icon>mdi-home</v-icon>
      <v-icon large>mdi-home</v-icon>
      <v-icon x-large>mdi-home</v-icon>
    </div>
  `, {
    eyes: {
      variations: ['dark']
    }
  })
  .add('dark', () => `
    <div>
      <v-icon dark>mdi-home</v-icon>
    </div>
  `, {
    vuetify: {
      theme: {
        dark: true
      }
    }
  })
  .add('color', () => `
    <div>
      <v-icon color="primary">mdi-home</v-icon>
      <v-icon color="red">mdi-home</v-icon>
      <v-icon color="#00FFFF">mdi-home</v-icon>
    </div>
  `)
