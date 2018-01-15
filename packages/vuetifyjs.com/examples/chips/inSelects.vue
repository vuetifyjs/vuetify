<template>
  <v-select
    label="Your favorite hobbies"
    chips
    tags
    solo
    prepend-icon="filter_list"
    append-icon=""
    clearable
    v-model="chips"
  >
    <template slot="selection" slot-scope="data">
      <v-chip
        close
        @input="remove(data.item)"
        :selected="data.selected"
      >
        <strong>{{ data.item }}</strong>&nbsp;
        <span>(interest)</span>
      </v-chip>
    </template>
  </v-select>
</template>

<script>
  export default {
    data () {
      return {
        chips: ['Programming', 'Playing video games', 'Watching', 'Sleeping']
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
