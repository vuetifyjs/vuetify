<template>
  <div>
    <v-layout wrap justify-space-around>
      <v-switch v-model="chips" label="Chips"></v-switch>
      <v-switch v-model="multiple" label="Multiple"></v-switch>
      <v-switch v-model="hideSelected" label="Hide selected"></v-switch>
      <v-switch v-model="noData" label="No data slot"></v-switch>
      <v-switch v-model="clearable" label="Clearable"></v-switch>
    </v-layout>

    <v-combobox
      v-model="model"
      :items="items"
      :search-input.sync="search"
      :hide-selected="hideSelected"
      label="Add some tags"
      :multiple="multiple"
      persistent-hint
      :small-chips="chips"
      :clearable="clearable"
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
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
      model: ['Vuetify'],
      search: null,
      chips: true,
      multiple: true,
      hideSelected: true,
      noData: true,
      clearable: false,
    }),
  }
</script>
