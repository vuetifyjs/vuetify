<template>
  <v-combobox
    v-model="chips"
    :items="items"
    chips
    clearable
    label="Your favorite hobbies"
    multiple
    prepend-icon="filter_list"
    solo
  >
    <template slot="selection" slot-scope="{ item, selected, select }">
      <v-chip
        :input-value="selected"
        @click="select"
        @click:close="remove(item)"
      >
        <strong>{{ item }}</strong>&nbsp;
        <span>(interest)</span>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
  export default {
    data () {
      return {
        chips: ['Programming', 'Playing video games', 'Watching movies', 'Sleeping'],
        items: ['Streaming', 'Eating']
      }
    },

    methods: {
      remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      }
    }
  }
</script>
