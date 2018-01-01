<template>
  <v-tabs
    centered
    color="cyan"
    dark
    slider-color="yellow"
  >
    <v-tab
      v-for="i in items"
      :key="i"
    >
      {{ i }}
    </v-tab>
    <v-tabs-item
      v-for="i in items"
      :key="i"
    >
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tabs-item>
  </v-tabs>
</template>

<script>
  export default {
    data () {
      return {
        items: ['Item One', 'Item Seventeen', 'Item Five'],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>
