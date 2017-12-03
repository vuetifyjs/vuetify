<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card height="200px">
        <v-card-row class="blue white--text">
          <v-menu bottom right>
            <v-btn icon="icon" slot="activator" light>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-item v-for="item in items" :key="item">
                <v-list-tile>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-card-title>Menu</v-card-title>
        </v-card-row>
        <v-card-text>Lorem Ipsum</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
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
