<template>
  <v-card width="350px" class="mx-auto">
    <v-toolbar color="transparent" class="px-0">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Contacts</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          color="primary"
          grow
        >
          <v-tab
            :value="1"
          >
            <v-icon>mdi-phone</v-icon>
          </v-tab>

          <v-tab
            :value="2"
          >
            <v-icon>mdi-heart</v-icon>
          </v-tab>

          <v-tab
            :value="3"
          >
            <v-icon>mdi-account-box</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-window v-model="tabs">
      <v-window-item
        v-for="i in 3"
        :key="i"
        :value="i"
      >
        <v-card>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        tabs: null,
      }
    },
  }
</script>
