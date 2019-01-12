<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Manage</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list class="indigo darken-2" dark>
          <template v-for="(item, index) in items">
            <v-list-tile v-if="item.action" :key="item.title" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="white--text">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-else-if="item.divider" :key="index"></v-divider>
            <v-subheader v-else-if="item.header" :key="item.header" class="grey--text text--lighten-4">{{ item.header }}</v-subheader>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
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
          title: 'Trash'
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
          title: 'Work'
        }
      ]
    })
  }
</script>
