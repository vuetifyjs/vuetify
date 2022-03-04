<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-toolbar
      color="purple"
      dark
    >
      <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>

      <v-toolbar-title>Settings</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>
    </v-toolbar>

    <v-list lines="three">
      <v-list-subheader>User Controls</v-list-subheader>

      <v-list-item>
        <v-list-item-header>
          <v-list-item-title>Content filtering</v-list-item-title>
          <v-list-item-subtitle>Set the content filtering level to restrict appts that can be downloaded</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>

      <v-list-item>
        <v-list-item-header>
          <v-list-item-title>Password</v-list-item-title>
          <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list lines="three" active-strategy="multiple">
      <v-list-subheader>General</v-list-subheader>

      <v-list-item value="notifications">
        <template v-slot:default="{ isActive }">
          <v-list-item-avatar left>
            <v-checkbox :model-value="isActive" hide-details></v-checkbox>
          </v-list-item-avatar>

          <v-list-item-header>
            <v-list-item-title>Notifications</v-list-item-title>
            <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
          </v-list-item-header>
        </template>
      </v-list-item>

      <v-list-item value="sound">
        <template v-slot:default="{ isActive }">
          <v-list-item-avatar left>
            <v-checkbox :model-value="isActive" hide-details></v-checkbox>
          </v-list-item-avatar>

          <v-list-item-header>
            <v-list-item-title>Sound</v-list-item-title>
            <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
          </v-list-item-header>
        </template>
      </v-list-item>

      <v-list-item value="widgets">
        <template v-slot:default="{ isActive }">
          <v-list-item-avatar left>
            <v-checkbox :model-value="isActive" hide-details></v-checkbox>
          </v-list-item-avatar>

          <v-list-item-header>
            <v-list-item-title>Auto-add widgets</v-list-item-title>
            <v-list-item-subtitle>Automatically add home screen widgets when downloads complete</v-list-item-subtitle>
          </v-list-item-header>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        settings: [],
      }
    },
  }
</script>
