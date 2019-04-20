<template>
  <v-card
    tile
    max-width="534"
    class="mx-auto"
  >
    <v-layout>
      <v-flex shrink>
        <v-avatar
          :size="$vuetify.breakpoint.smAndUp ? 164 : 128"
          color="grey"
          tile
        >
          <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
        </v-avatar>
      </v-flex>
      <v-flex>
        <v-img
          height="100%"
          src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
        >
          <v-layout
            align-end
            fill-height
          >
            <v-list-item
              dark
              color="rgba(0, 0, 0, .4)"
            >
              <v-list-item-content>
                <v-list-item-title class="title">Marcus Obrien</v-list-item-title>
                <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-layout>
        </v-img>
      </v-flex>
    </v-layout>
  </v-card>
</template>
