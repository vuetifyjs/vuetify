<template>
  <v-toolbar light>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down" v-for="item in items" :key="item.text">
      <v-btn flat>{{ item.text }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            text: 'Link One'
          },
          {
            text: 'Link Two'
          },
          {
            text: 'Link Three'
          }
        ]
      }
    }
  }
</script>
