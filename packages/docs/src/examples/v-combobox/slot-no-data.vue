<template>
  <v-container fluid>
    <v-combobox
      v-model="model"
      v-model:search="search"
      :hide-no-data="false"
      :items="items"
      hint="Maximum of 5 tags"
      label="Add some tags"
      hide-selected
      multiple
      persistent-hint
      small-chips
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-combobox>
  </v-container>
</template>

<script setup>
  import { nextTick, ref, watch } from 'vue'

  const items = ['Gaming', 'Programming', 'Vue', 'Vuetify']

  const model = ref(['Vuetify'])
  const search = ref(null)

  watch(model, val => {
    if (val.length > 5) {
      nextTick(() => model.value.pop())
    }
  })
</script>

<script>
  export default {
    data: () => ({
      items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
      model: ['Vuetify'],
      search: null,
    }),

    watch: {
      model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      },
    },
  }
</script>
