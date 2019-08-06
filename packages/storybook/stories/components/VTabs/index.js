import { storiesOf } from '@storybook/vue';

storiesOf('VTabs', module)
  .add('default', () => `
    <v-tabs>
      <v-tab id="foo">foo</v-tab>
      <v-tab id="bar">bar</v-tab>
    </v-tabs>
  `)
