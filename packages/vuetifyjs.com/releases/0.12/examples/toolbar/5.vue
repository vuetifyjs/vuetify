<template>
  <div id="toolbar-image">
    <v-toolbar class="transparent elevation-0" light>
      <v-toolbar-title class="hidden-sm-and-down">Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-toolbar-item v-for="item in items" :key="item">
          {{ item.title }}
        </v-toolbar-item>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Send Feedback' },
          { title: 'Request Help' },
          { title: 'Contact Developer' }
        ]
      }
    }
  }
</script>

<style>
  #toolbar-image {
    background: url('/static/doc-images/hero_bg.png');
  }
</style>
