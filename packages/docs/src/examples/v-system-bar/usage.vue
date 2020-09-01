<template>
  <v-row
    justify="center"
    align="center"
  >
    <v-container fluid>
      <v-card
        img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg"
        height="200px"
        class="mb-6"
      >
        <v-system-bar
          color="orange"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <v-icon>mdi-gmail</v-icon>
          <span>10 unread emails</span>
          <v-spacer></v-spacer>
          <v-icon>mdi-wifi-strength-4</v-icon>
          <v-icon>mdi-signal-cellular-outline</v-icon>
          <v-icon>mdi-battery</v-icon>
          <span>12:30</span>
        </v-system-bar>
      </v-card>
    </v-container>
  </v-row>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        height: 30,
        'lights-out': false,
        window: false,
      },
      options: {
        booleans: ['lights-out'],
        sliders: {
          height: [1, 60],
        },
      },
      tabs: ['window'],
    }),
  }
</script>
