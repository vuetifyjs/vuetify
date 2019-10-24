<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      offset-sm="3"
    >
      <v-card color="grey darken-1">
        <v-card-title>
          <span class="headline white--text pl-4">Portrait View</span>

          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            dark
            icon
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            dark
            icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>

        <v-list class="grey darken-1">
          <v-list-item>
            <v-list-item-action>
              <v-icon color="white">mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text">(650) 555-1234</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon class="white--text">chat</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon color="white">mdi-phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text">(323) 555-6789</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon class="white--text">chat</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon color="white">mdi-email</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text">mcbeal@example.com</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-action>
              <v-icon color="white">mdi-map-marker</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text">Orlando, FL 79938</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-img
          src="https://picsum.photos/250/300?image=1027"
          height="200px"
        ></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
