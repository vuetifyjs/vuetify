<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-combobox
        hint="Comboboxes can receive custom values not present in items"
        :items="items"
        label="Add some tags"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template
          v-if="$attrs.noData"
          v-slot:no-data
        >
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
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
      search: null,
      defaults: {
        clearable: false,
        dense: false,
        filled: false,
        'hide-selected': false,
        multiple: false,
        outlined: false,
        'persistent-hint': false,
        'small-chips': false,
        solo: false,
      },
      options: {
        booleans: [
          'clearable',
          'hide-selected',
          'multiple',
          'persistent-hint',
          'small-chips',
        ],
      },
      tabs: ['dense', 'filled', 'outlined', 'solo'],
    }),
  }
</script>
