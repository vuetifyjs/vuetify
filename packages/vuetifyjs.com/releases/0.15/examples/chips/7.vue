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
    <template slot="selection" scope="data">
      <v-chip
        close
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
        chips: ['Progamming', 'Playing video games']
      }
    }
  }
</script>
