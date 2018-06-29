<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card height="200px">
        <v-card-title class="blue white--text">
          <span class="headline">Menu</span>
          <v-spacer></v-spacer>
          <v-menu bottom left>
            <v-btn icon slot="activator" dark>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="item in items" :key="item.title" @click="">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-text>Lorem Ipsum</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    })
  }
</script>
