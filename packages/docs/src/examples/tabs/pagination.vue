<template>
  <v-tabs
    dark
    color="cyan"
    show-arrows
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab
      v-for="i in 30"
      :key="i"
      :href="'#tab-' + i"
    >
      Item {{ i }}
    </v-tab>

    <v-tabs-items>
      <v-tab-item
        v-for="i in 30"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
  export default {
    data () {
      return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>
