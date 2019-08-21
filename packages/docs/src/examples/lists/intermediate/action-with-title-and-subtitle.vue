<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-card>
        <v-toolbar color="purple" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Settings</v-toolbar-title>

          <div class="flex-grow-1"></div>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          subheader
          three-line
        >
          <v-subheader>General</v-subheader>

          <v-list-item @click="">
            <v-list-item-action>
              <v-checkbox
                v-model="notifications"
                readonly
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content @click="notifications = !notifications">
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="">
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content @click="sound = !sound">
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="">
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content @click="widgets = !widgets">
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  }
</script>
