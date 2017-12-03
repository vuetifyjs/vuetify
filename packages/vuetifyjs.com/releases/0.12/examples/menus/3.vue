<template>
  <div class="text-xs-center">
    <v-menu
      origin="center center"
      transition="v-scale-transition"
      bottom
    >
      <v-btn primary light slot="activator">
        Scale Transition
      </v-btn>
      <v-list>
        <v-list-item v-for="item in items" :key="item">
          <v-list-tile>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu
      transition="v-slide-x-transition"
      bottom
      right
    >
      <v-btn primary light slot="activator" class="deep-orange">
        Slide X Transition
      </v-btn>
      <v-list>
        <v-list-item v-for="item in items" :key="item">
          <v-list-tile>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu
      transition="v-slide-y-transition"
      bottom
    >
      <v-btn primary light slot="activator" class="purple">
        Slide Y Transition
      </v-btn>
      <v-list>
        <v-list-item v-for="item in items" :key="item">
          <v-list-tile>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            title: 'Click Me'
          },
          {
            title: 'Click Me'
          },
          {
            title: 'Click Me'
          },
          {
            title: 'Click Me 2'
          }
        ]
      }
    }
  }
</script>
