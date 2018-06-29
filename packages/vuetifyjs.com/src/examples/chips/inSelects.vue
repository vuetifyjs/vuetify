<template>
  <v-autocomplete
    v-model="chips"
    :items="items"
    label="Your favorite hobbies"
    chips
    clearable
    prepend-icon="filter_list"
    solo
    tags
  >
    <template slot="selection" slot-scope="data">
      <v-chip
        :selected="data.selected"
        close
        @input="remove(data.item)"
      >
        <strong>{{ data.item }}</strong>&nbsp;
        <span>(interest)</span>
      </v-chip>
    </template>
  </v-autocomplete>
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
