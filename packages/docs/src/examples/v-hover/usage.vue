<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-hover
      v-slot:default="{ hover }"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-card
        :elevation="hover ? 12 : 2"
        :class="{ 'on-hover': hover }"
        height="200"
        max-width="350"
        class="mx-auto"
      >
        <v-card-text class="my-4 text-center title">
          Hover over me!
        </v-card-text>
      </v-card>
    </v-hover>
  </v-row>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        'close-delay': 0,
        disabled: false,
        'open-delay': 0,
      },
      options: {
        sliders: {
          'close-delay': [0, 1000],
          'open-delay': [0, 1000],
        },
      },
      tabs: ['disabled'],
    }),
  }
</script>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>
