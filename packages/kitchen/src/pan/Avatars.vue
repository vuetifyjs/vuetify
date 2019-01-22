<template>
  <v-container text-xs-center>
    <v-layout
      column
      variations
    >
      <main-header>Avatars</main-header>

      <v-flex>
        <h3 class="title grey--text mb-4 mt-5">
          Round
        </h3>
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
        <h3 class="title grey--text mb-4 mt-5">
          Tile
        </h3>
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
        <h3 class="title grey--text mb-4 mt-5">
          With icons
        </h3>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-avatar
            size="32"
            color="indigo"
          >
            <v-icon dark>
              mdi-account-group
            </v-icon>
          </v-avatar>
          <v-avatar
            size="64"
            color="indigo"
          >
            <v-icon dark>
              mdi-account-group
            </v-icon>
          </v-avatar>
          <v-avatar
            size="128"
            color="indigo"
          >
            <v-icon dark>
              mdi-account-group
            </v-icon>
          </v-avatar>
          <v-avatar
            size="256"
            color="indigo"
          >
            <v-icon dark>
              mdi-account-group
            </v-icon>
          </v-avatar>
        </v-layout>
      </v-flex>
      <v-flex>
        <h3 class="title grey--text mb-4 mt-5">
          With images
        </h3>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-avatar size="32">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <v-avatar size="64">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <v-avatar size="128">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <v-avatar size="256">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
        </v-layout>
      </v-flex>
      <v-flex>
        <h3 class="title grey--text mb-4 mt-5">
          With badges
        </h3>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-badge overlap>
            <span slot="badge">
              3
            </span>

            <v-avatar
              color="purple red--after"
              size="32"
            >
              <v-icon dark>
                mdi-alarm
              </v-icon>
            </v-avatar>
          </v-badge>
          <v-badge overlap>
            <span slot="badge">
              3
            </span>

            <v-avatar
              color="purple red--after"
              size="64"
            >
              <v-icon dark>
                mdi-alarm
              </v-icon>
            </v-avatar>
          </v-badge>
          <v-badge overlap>
            <span slot="badge">
              3
            </span>

            <v-avatar
              color="purple red--after"
              size="128"
            >
              <v-icon dark>
                mdi-alarm
              </v-icon>
            </v-avatar>
          </v-badge>
          <v-badge overlap>
            <span slot="badge">
              3
            </span>

            <v-avatar
              color="purple red--after"
              size="256"
            >
              <v-icon dark>
                mdi-alarm
              </v-icon>
            </v-avatar>
          </v-badge>
        </v-layout>
      </v-flex>
      <v-flex>
        <h3 class="title grey--text mb-4 mt-5">
          With letters
        </h3>
        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-avatar
            size="32"
            color="teal"
          >
            <span class="white--text headline">
              C
            </span>
          </v-avatar>
          <v-avatar
            size="64"
            color="teal"
          >
            <span class="white--text headline">
              C
            </span>
          </v-avatar>
          <v-avatar
            size="128"
            color="teal"
          >
            <span class="white--text headline">
              C
            </span>
          </v-avatar>
          <v-avatar
            size="256"
            color="teal"
          >
            <span class="white--text headline">
              C
            </span>
          </v-avatar>
        </v-layout>

        <v-layout
          align-center
          justify-space-around
          wrap
        >
          <v-avatar
            size="32"
            color="red"
          >
            <span class="white--text headline">
              J
            </span>
          </v-avatar>
          <v-avatar
            size="64"
            color="red"
          >
            <span class="white--text headline">
              J
            </span>
          </v-avatar>
          <v-avatar
            size="128"
            color="red"
          >
            <span class="white--text headline">
              J
            </span>
          </v-avatar>
          <v-avatar
            size="256"
            color="red"
          >
            <span class="white--text headline">
              J
            </span>
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
