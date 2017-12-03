<template>
  <v-toolbar class="purple" light>
    <v-toolbar-side-icon light></v-toolbar-side-icon>
    <v-toolbar-title class="hidden-sm-and-down">Toolbar</v-toolbar-title>
    <v-toolbar-items>
      <v-toolbar-item>Home</v-toolbar-item>
      <v-toolbar-item>Contact</v-toolbar-item>
      <v-menu top left offset-y origin="bottom right" transition="v-slide-y-transition">
        <v-btn icon light slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-item v-for="item in items" :key="item">
            <v-list-tile>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
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
