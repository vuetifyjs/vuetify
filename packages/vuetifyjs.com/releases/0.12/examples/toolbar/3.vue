<template>
  <v-toolbar class="red" light>
    <v-toolbar-side-icon light></v-toolbar-side-icon>
    <v-toolbar-title>Toolbar</v-toolbar-title>
    <v-toolbar-items>
      <v-btn light icon>
        <v-icon>list</v-icon>
      </v-btn>
      <v-menu left top origin="bottom right" transition="v-scale-transition">
        <v-btn light icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-title>Change Account</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Invite Friends</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
