<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-hover
        v-slot:default="{ hover }"
        v-bind="attrs"
      >
        <v-card
          :elevation="hover ? 12 : 2"
          :class="{ 'on-hover': hover }"
          height="300"
          max-width="350"
          class="mx-auto"
        >
          <v-card-text class="my-4 text-center title">Hover over me!</v-card-text>
        </v-card>
      </v-hover>
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>

<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)

  >.v-card__text
    color: #000
</style>
