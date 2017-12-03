<template>
  <v-tabs dark fixed centered>
    <v-toolbar extended class="cyan" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-toolbar-title slot="extension" class="display-2">Page title</v-toolbar-title>
    </v-toolbar>
    <v-tabs-bar class="cyan">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item
        v-for="i in 3"
        :key="i"
        :href="'#tab-' + i"
      >
        Item {{ i }}
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for="i in 3"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
  export default {
    data () {
      return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>


