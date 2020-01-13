<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-toolbar color="teal" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Manage</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <template v-for="(item, index) in items">
            <v-list-item
              v-if="item.action"
              :key="item.title"
              @click=""
            >
              <v-list-item-action>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider
              v-else-if="item.divider"
              :key="index"
            ></v-divider>

            <v-subheader
              v-else-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            action: 'move_to_inbox',
            title: 'Inbox',
          },
          {
            action: 'send',
            title: 'Sent',
          },
          {
            action: 'delete',
            title: 'Trash',
          },
          {
            action: 'report',
            title: 'Spam',
          },
          { divider: true },
          { header: 'Labels' },
          {
            action: 'label',
            title: 'Family',
          },
          {
            action: 'label',
            title: 'Friends',
          },
          {
            action: 'label',
            title: 'Work',
          },
        ],
      }
    },
  }
</script>
