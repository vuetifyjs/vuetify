<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar class="teal" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title class="text-xs-center">New Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list subheader>
          <v-subheader>Recent chat</v-subheader>
            <v-list-tile avatar v-for="item in items" v-bind:key="item.title" @click="">
              <v-list-tile-avatar>
                <img v-bind:src="item.avatar"/>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon v-bind:class="[item.active ? 'teal--text' : 'grey--text']">chat_bubble</v-icon>
              </v-list-tile-action>
            </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>Previous chats</v-subheader>
          <v-list-tile avatar v-for="item in items2" v-bind:key="item.title" @click="">
            <v-list-tile-avatar>
              <img v-bind:src="item.avatar"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
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
          { active: true, title: 'Jason Oner', avatar: '/doc-images/lists/1.jpg' },
          { active: true, title: 'Ranee Carlson', avatar: '/doc-images/lists/2.jpg' },
          { title: 'Cindy Baker', avatar: '/doc-images/lists/3.jpg' },
          { title: 'Ali Connors', avatar: '/doc-images/lists/4.jpg' },
        ],
        items2: [
          { title: 'Travis Howard', avatar: '/doc-images/lists/5.jpg' },
        ]
      }
    }
  }
</script>
