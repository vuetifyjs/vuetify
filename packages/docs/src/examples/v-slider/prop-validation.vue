<template>
  <v-card
    flat
    color="transparent"
  >
    <v-subheader>Rules</v-subheader>

    <v-card-text class="pt-0">
      <v-slider
        v-model="value"
        :rules="rules"
        label="How many?"
        step="10"
        thumb-label="always"
        ticks
      ></v-slider>
    </v-card-text>

    <v-subheader>Persistent hint</v-subheader>

    <v-card-text class="pt-0">
      <v-slider
        v-model="value"
        :rules="rules"
        hint="40 in stock"
        label="How many?"
        persistent-hint
        step="10"
        thumb-label="always"
        ticks
      ></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        value: 30,
        rules: [
          v => v <= 40 || 'Only 40 in stock',
        ],
      }
    },
  }
</script>
