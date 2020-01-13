<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-combobox
        v-model="model"
        label="Add some tags"
        :items="items"
        :search-input.sync="search"
        v-bind="attrs"
      >
        <template v-if="noData" v-slot:no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data: () => ({
      items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
      model: ['Vuetify'],
      search: null,
    }),
  }
</script>
