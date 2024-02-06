<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          size="small"
          prepend-icon="mdi-cog"
          text="Settings"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card>
        <v-toolbar>
          <v-btn
            icon="mdi-close"
            @click="dialog = false"
          ></v-btn>

          <v-toolbar-title>Settings</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn
              text="Save"
              variant="text"
              @click="dialog = false"
            ></v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-list
          lines="two"
          subheader
        >
          <v-list-subheader>User Controls</v-list-subheader>

          <v-list-item
            link
            title="Content filtering"
            subtitle="Set the content filtering level to restrict apps that can be downloaded"
          ></v-list-item>

          <v-list-item
            link
            title="Password"
            subtitle="Require password for purchase or use password to restrict purchase"
          ></v-list-item>

          <v-divider></v-divider>

          <v-list-subheader>General</v-list-subheader>

          <v-list-item
            title="Notifications"
            subtitle="Notify me about updates to apps or games that I downloaded"
            @click="notifications = !notifications"
          >
            <template v-slot:prepend>
              <v-list-item-action start>
                <v-checkbox-btn v-model="notifications" color="primary"></v-checkbox-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-list-item
            title="Sound"
            subtitle="Auto-update apps at any time. Data charges may apply"
            @click="sound = !sound"
          >
            <template v-slot:prepend>
              <v-list-item-action start>
                <v-checkbox-btn v-model="sound" color="primary"></v-checkbox-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-list-item
            title="Auto-add widgets"
            subtitle="Automatically add home screen widgets"
            @click="widgets = !widgets"
          >
            <template v-slot:prepend>
              <v-list-item-action start>
                <v-checkbox-btn v-model="widgets" color="primary"></v-checkbox-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const dialog = shallowRef(false)
  const notifications = shallowRef(false)
  const sound = shallowRef(true)
  const widgets = shallowRef(false)
</script>

<script>
  export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  }
</script>
