<template>
  <v-layout justify-center>
    <v-flex xs12 sm8>
      <v-card>
        <v-card-title class="cyan darken-1">
          <span class="headline white--text">Sarah Mcbeal</span>

          <v-spacer></v-spacer>

          <v-btn dark icon>
            <v-icon>chevron_left</v-icon>
          </v-btn>

          <v-btn dark icon>
            <v-icon>edit</v-icon>
          </v-btn>

          <v-btn dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-card-title>

        <v-list>
          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>(650) 555-1234</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>

              <v-icon>chat</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>phone</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>(323) 555-6789</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon>chat</v-icon>
            </v-list-item-action>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>mail</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>mcbeal@example.com</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item @click="">
            <v-list-item-action>
              <v-icon>location_on</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Orlando, FL 79938</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-img
          src="https://picsum.photos/700?image=996"
          height="200px"
        ></v-img>
      </v-card>
    </v-flex>
  </v-layout>
</template>
