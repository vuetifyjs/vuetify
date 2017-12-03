<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar class="white--text indigo" light>
          <v-toolbar-side-icon light></v-toolbar-side-icon>
          <v-toolbar-title>Inbox</v-toolbar-title>
          <v-btn light icon>
             <v-icon>search</v-icon>
          </v-btn>
          <v-btn light icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-item v-for="item in items" v-bind:key="item.title">
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-icon v-if="item.icon" class="pink--text">star</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-avatar>
                <img v-bind:src="item.avatar"/>
              </v-list-tile-avatar>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { icon: true, title: 'Jason Oner', avatar: '/static/doc-images/lists/1.jpg' },
          { title: 'Travis Howard', avatar: '/static/doc-images/lists/2.jpg' },
          { title: 'Ali Connors', avatar: '/static/doc-images/lists/3.jpg' },
          { title: 'Cindy Baker', avatar: '/static/doc-images/lists/4.jpg' },
        ]
      }
    }
  }
</script>
