<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-toolbar color="purple">
      <v-btn icon="mdi-menu"></v-btn>

      <v-toolbar-title>Settings</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-magnify"></v-btn>
    </v-toolbar>

    <v-list lines="three">
      <v-list-subheader>User Controls</v-list-subheader>

      <v-list-item>
        <v-list-item-title>Content filtering</v-list-item-title>

        <v-list-item-subtitle>
          Set the content filtering level to restrict appts that can be downloaded
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Password</v-list-item-title>

        <v-list-item-subtitle>
          Require password for purchase or use password to restrict purchase
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list lines="three" select-strategy="classic">
      <v-list-subheader>General</v-list-subheader>

      <v-list-item value="notifications">
        <template v-slot:prepend="{ isActive }">

          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title>Notifications</v-list-item-title>

        <v-list-item-subtitle>
          Notify me about updates to apps or games that I downloaded
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item value="sound">
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title>Sound</v-list-item-title>

        <v-list-item-subtitle>
          Auto-update apps at any time. Data charges may apply
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item value="widgets">
        <template v-slot:prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title>Auto-add widgets</v-list-item-title>

        <v-list-item-subtitle>
          Automatically add home screen widgets when downloads complete
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>
