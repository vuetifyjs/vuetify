<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-bottom-sheet
        v-model="sheet"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="purple"
            dark
            v-on="on"
          >
            Open Playground
          </v-btn>
        </template>
        <v-sheet
          class="text-center"
          height="200px"
        >
          <v-btn
            class="my-6"
            depressed
            color="error"
            @click="sheet = !sheet"
          >
            close
          </v-btn>
        </v-sheet>
      </v-bottom-sheet>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      sheet: false,
      defaults: {
        'hide-overlay': false,
        inset: false,
        persistent: false,
      },
      options: {
        booleans: ['hide-overlay', 'persistent'],
      },
      tabs: ['inset'],
    }),
  }
</script>
