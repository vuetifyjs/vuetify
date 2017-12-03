<template>
  <v-app id="example-1" standalone>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      light
      enable-resize-watcher
      overflow
      absolute
    >
      <v-list dense>
        <v-list-tile @click.native.stop="left = !left">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      persistent
      v-model="drawerRight"
      light
      right
      enable-resize-watcher
      overflow
      absolute
    >
      <v-list dense>
        <v-list-tile @click.native.stop="right = !right">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="indigo" dark>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.native.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>
    <main>
      <v-navigation-drawer
        temporary
        v-model="left"
        overflow
        absolute
      ></v-navigation-drawer>
      <v-container fluid>
        <!--v-router-->
      </v-container>
      <v-navigation-drawer
        right
        temporary
        v-model="right"
        overflow
        absolute
      ></v-navigation-drawer>
    </main>
    <v-footer class="indigo">
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        drawerRight: true,
        right: null,
        left: null
      }
    }
  }
</script>
