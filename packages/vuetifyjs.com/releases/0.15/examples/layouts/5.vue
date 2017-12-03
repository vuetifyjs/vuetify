<template>
  <v-app toolbar id="keep">
    <v-navigation-drawer
      permanent
      clipped
      class="pb-0"
      height="100%"
      light
    >
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <v-btn small flat>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider
            dark
            v-else-if="item.divider"
            class="my-4"
            :key="i"
          ></v-divider>
          <v-list-tile
            :key="i"
            v-else
            @click=""
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="amber">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <span class="title">Google&nbsp;<span class="text">Keep</span></span>
    </v-toolbar>
    <main>
      <v-container fluid class="grey lighten-4">
        <!--v-router-->
      </v-container>
    </main>
  </v-app>

</template>

<script>
  export default {
    data: () => ({
      items: [
        { icon: 'lightbulb_outline', text: 'Notes' },
        { icon: 'touch_app', text: 'Reminders' },
        { divider: true },
        { heading: 'Labels' },
        { icon: 'add', text: 'Create new label' },
        { divider: true },
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' },
        { divider: true },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Trash' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Keyboard shortcuts' }
      ]
    })
  }
</script>

<style lang="stylus">
  #keep
    main .container
      height: 660px

    .navigation-drawer__border
      display: none

    .text
      font-weight: 400
</style>
