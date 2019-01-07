<template>
  <v-container text-xs-center>
    <v-layout
      column
      variations>
      <v-flex>
        <v-layout
          justify-space-around
          align-center
          wrap
        >
          <v-avatar
            size="32"
            color="grey lighten-4"
          >
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
          </v-avatar>
          <v-avatar
            size="64"
            color="grey lighten-4"
          >
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
          </v-avatar>
          <v-avatar
            size="128"
            color="grey lighten-4"
          >
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
          </v-avatar>
          <v-avatar
            size="256"
            color="grey lighten-4"
          >
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
          </v-avatar>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout
          justify-space-around
          align-center
          wrap
        >
          <v-avatar
            size="32"
            color="grey lighten-4"
            tile
          >
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
          </v-avatar>
          <v-avatar
            size="64"
            color="grey lighten-4"
            tile
          >
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
          </v-avatar>
          <v-avatar
            size="128"
            color="grey lighten-4"
            tile
          >
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
          </v-avatar>
          <v-avatar
            size="256"
            color="grey lighten-4"
            tile
          >
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png">
          </v-avatar>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-avatar color="indigo">
            <v-icon dark>mdi-account-group</v-icon>
          </v-avatar>

          <v-avatar>
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>

          <v-badge overlap>
            <span slot="badge">3</span>

            <v-avatar
              color="purple red--after"
            >
              <v-icon dark>mdi-alarm</v-icon>
            </v-avatar>
          </v-badge>

          <v-avatar color="teal">
            <span class="white--text headline">C</span>
          </v-avatar>

          <v-avatar color="red">
            <span class="white--text headline">J</span>
          </v-avatar>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Avatars',

  data: () => ({
  })
}
</script>

<style scoped>
.flex {
  margin-top: 2rem;
}
</style>

