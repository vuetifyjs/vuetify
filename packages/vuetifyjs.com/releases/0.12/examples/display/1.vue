<template>
  <v-toolbar light>
    <v-toolbar-logo>Logo</v-toolbar-logo>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-toolbar-item v-for="item in items" :key="item">{{ item.text }}</v-toolbar-item>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            text: 'Link'
          },
          {
            text: 'Link'
          },
          {
            text: 'Link'
          }
        ]
      }
    }
  }
</script>
