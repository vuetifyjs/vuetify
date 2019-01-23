<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      xs12
      sm6
      offset-sm3
    >
      <v-card color="grey darken-1">
        <v-card-title>
          <span class="headline white--text pl-3">Portrait View</span>

          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
          >
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-btn
            dark
            icon
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            dark
            icon
          >
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-card-title>

        <v-list class="grey darken-1">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="white">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="white--text">(650) 555-1234</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon class="white--text">chat</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="white">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="white--text">(323) 555-6789</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon class="white--text">chat</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="white">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="white--text">mcbeal@example.com</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="white">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="white--text">Orlando, FL 79938</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-img
          src="https://picsum.photos/250/300?image=1027"
          height="200px"
        ></v-img>
      </v-card>
    </v-flex>
  </v-layout>
</template>
