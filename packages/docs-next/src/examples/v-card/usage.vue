<template>
  <v-container>
    <v-row>
      <div class="mx-3"></div>
      <v-card
        v-bind="$attrs"
        v-on="$listeners"
      >
        <v-card-title>Card title</v-card-title>
        <v-card-subtitle>Secondary text</v-card-subtitle>

        <v-card-text>
          Greyhound divisively hello coldly wonderfully marginally far upon excluding.
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        disabled: false,
        elevation: 2,
        loading: false,
        outlined: false,
        shaped: false,
        tile: false,
      },
      options: {
        booleans: ['disabled', 'loading'],
        sliders: { elevation: [0, 24] },
      },
      tabs: ['outlined', 'shaped', 'tile'],
    }),
  }
</script>
