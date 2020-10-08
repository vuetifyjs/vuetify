<template>
  <v-card
    class="grow"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-card-title>Card title</v-card-title>

    <v-card-subtitle>Subtitle text</v-card-subtitle>

    <v-card-text>
      Greyhound divisively hello coldly wonderfully marginally far upon excluding.
    </v-card-text>

    <v-card-actions>
      <v-btn
        v-for="n in 2"
        :key="n"
        text
        color="primary"
      >
        Action {{ n }}
      </v-btn>
    </v-card-actions>
  </v-card>
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
