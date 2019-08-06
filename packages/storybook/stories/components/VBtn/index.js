import { storiesOf } from '@storybook/vue';

import playground from './playground';

storiesOf('VBtn', module)
  .add('default', () => '<v-btn>foo</v-btn>', { eyes: { variations: ['dark'] } })
  .add('disabled', () => '<v-btn disabled>foo</v-btn>')
  .add('playground', playground, {
    eyes: {
      include: false
    }
  })
