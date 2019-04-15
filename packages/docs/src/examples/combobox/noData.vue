<template>
  <v-combobox
    v-model="model"
    :items="items"
    :search-input.sync="search"
    hide-selected
    hint="Maximum of 5 tags"
    label="Add some tags"
    multiple
    persistent-hint
    small-chips
  >
    <template v-slot:no-data>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-combobox>
</template>

<script>
  export default {
    data: () => ({
      items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
      model: ['Vuetify'],
      search: null
    }),

    watch: {
      model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      }
    }
  }
</script>
