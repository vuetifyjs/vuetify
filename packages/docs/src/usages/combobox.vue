<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-combobox
        v-model="model"
        :items="items"
        :search-input.sync="search"
        label="Add some tags"
        hint="Comboboxes can receive custom values not present in items"
        v-bind="{
          ...attrs,
          [attrs.type]: true,
        }"
      >
        <template
          v-if="attrs.noData"
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
  import Usage from './usage'

  export default {
    mixins: [Usage],

    data: () => ({
      items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
      model: 'Vuetify',
      search: null,
    }),

    watch: {
      attrs: {
        deep: true,
        handler (val, oldVal) {
          if (val['small-chips'] !== oldVal['small-chips']) {
            this.resetSearch()
          }

          if (val.multiple !== oldVal.multiple) {
            this.resetModel(val)
          }
        },
      },
    },

    methods: {
      resetModel () {
        this.model = this.attrs.multiple
          ? this.model ? this.model.split(', ') : []
          : this.model ? this.model.join(', ') : null
      },
      resetSearch () {
        this.search = (!this.attrs['small-chips'] && !this.attrs.multiple)
          ? 'Vuetify'
          : (this.attrs['small-chips'] || this.attrs.multiple) ? null : 'Vuetify'
      },
      resetState () {
        this.resetModel()
        this.resetSearch()
      },
    },
  }
</script>
