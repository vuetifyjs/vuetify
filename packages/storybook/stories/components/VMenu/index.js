import { storiesOf } from '@storybook/vue';

storiesOf('VMenu', module)
  .add('default', () => `
    <div>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            v-on="on"
          >
            Dropdown
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="">
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>
          <v-list-item @click="">
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  `)
