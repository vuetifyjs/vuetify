<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-system-bar></v-system-bar>

    <v-layout
      align-center
      pa-3
    >
      <span class="mr-3">To</span>
      <v-menu
        v-model="menu"
        bottom
        right
        transition="scale-transition"
        origin="top left"
      >
        <v-chip
          slot="activator"
          pill
        >
          <v-avatar left>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-avatar>
          John Leider
        </v-chip>
        <v-card width="300">
          <v-list dark>
            <v-list-tile>
              <v-list-tile-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>John Leider</v-list-tile-title>
                <v-list-tile-sub-title>john@vuetifyjs.com</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  icon
                  @click="menu = false"
                >
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-list>
            <v-list-tile @click="() => {}">
              <v-list-tile-action>
                <v-icon>mdi-briefcase</v-icon>
              </v-list-tile-action>
              <v-list-tile-sub-title>john@gmail.com</v-list-tile-sub-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-layout>

    <v-divider></v-divider>

    <v-text-field
      full-width
      value="Re: Vacation Request"
      label="Subject"
      single-line
    ></v-text-field>

    <v-textarea
      full-width
      single-line
      label="Message"
    ></v-textarea>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      menu: false
    })
  }
</script>
