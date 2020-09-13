<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      offset-sm="3"
    >
      <v-card>
        <v-toolbar
          color="teal"
          dark
        >
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
            action: 'mdi-inbox-arrow-down',
            title: 'Inbox',
          },
          {
            action: 'mdi-send',
            title: 'Sent',
          },
          {
            action: 'mdi-delete',
            title: 'Trash',
          },
          {
            action: 'mdi-alert-octagon',
            title: 'Spam',
          },
          { divider: true },
          { header: 'Labels' },
          {
            action: 'mdi-label',
            title: 'Family',
          },
          {
            action: 'mdi-label',
            title: 'Friends',
          },
          {
            action: 'mdi-label',
            title: 'Work',
          },
        ],
      }
    },
  }
</script>
