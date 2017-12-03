<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar class="teal white--text" light>
          <v-toolbar-side-icon light></v-toolbar-side-icon>
          <v-toolbar-title>Manage</v-toolbar-title>
          <v-btn icon light>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <template v-for="item in items">
            <v-divider v-if="item.divider"></v-divider>
            <v-subheader v-else-if="item.header" v-text="item.header"></v-subheader>
            <v-list-item v-else>
              <v-list-tile slot="item">
                <v-list-tile-action>
                  <v-icon light>{{ item.action }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </template>
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
          {
            action: 'move_to_inbox',
            title: 'Inbox'
          },
          {
            action: 'send',
            title: 'Sent'
          },
          {
            action: 'delete',
            title: 'Trash',
          },
          {
            action: 'report',
            title: 'Spam'
          },
          { divider: true },
          { header: 'Labels' },
          {
            action: 'label',
            title: 'Family'
          },
          {
            action: 'label',
            title: 'Friends'
          },
          {
            action: 'label',
            title: 'Work',
          }
        ]
      }
    }
  }
</script>
