<template>
  <v-container>
    <v-layout column>
      <main-header>Toolbars</main-header>

      <core-title>Light status bar</core-title>
      <core-section>
        <v-card
          img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg"
          height="200px"
        >
          <v-system-bar
            status
            color="primary"
          >
            <v-spacer />
            <v-icon>mdi-wifi-strength-4</v-icon>
            <v-icon>mdi-signal-off</v-icon>
            <v-icon>mdi-battery</v-icon>
            <span>12:30</span>
          </v-system-bar>
        </v-card>
      </core-section>

      <core-title>Lights out</core-title>
      <core-section>
        <v-card
          img="https://cdn.vuetifyjs.com/images/home/vuetify_layout2.svg"
          height="200px"
        >
          <v-system-bar
            status
            color="primary"
            lights-out
          >
            <v-spacer />
            <v-icon>mdi-wifi-strength-4</v-icon>
            <v-icon>mdi-signal-off</v-icon>
            <v-icon>mdi-battery</v-icon>
            <span>12:30</span>
          </v-system-bar>
        </v-card>
      </core-section>

      <core-title>Dark status bar</core-title>
      <core-section>
        <v-card
          img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg"
          height="200px"
        >
          <v-system-bar
            status
            color="primary"
            dark
          >
            <v-spacer />
            <v-icon>mdi-wifi-strength-4</v-icon>
            <v-icon>mdi-signal-off</v-icon>
            <v-icon>mdi-battery</v-icon>
            <span>12:30</span>
          </v-system-bar>
        </v-card>
      </core-section>

      <core-title>Lights out</core-title>
      <core-section>
        <v-card
          img="https://cdn.vuetifyjs.com/images/home/vuetify_layout2.svg"
          height="200px"
        >
          <v-system-bar
            status
            color="primary"
            lights-out
            dark
          >
            <v-spacer />
            <v-icon>mdi-wifi-strength-4</v-icon>
            <v-icon>mdi-signal-off</v-icon>
            <v-icon>mdi-battery</v-icon>
            <span>12:30</span>
          </v-system-bar>
        </v-card>
      </core-section>

      <core-title>Window bar</core-title>
      <core-section>
        <v-system-bar
          window
          dark
        >
          <v-spacer />
          <v-icon>mdi-minus</v-icon>
          <v-icon>mdi-checkbox-blank-outline</v-icon>
          <v-icon>mdi-close</v-icon>
        </v-system-bar>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'SystemBars',

    data: () => ({})
  }
</script>
