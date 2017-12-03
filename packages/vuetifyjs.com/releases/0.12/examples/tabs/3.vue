<template>
  <v-tabs id="mobile-tabs-3" grow light>
    <v-tabs-bar slot="activators">
      <v-tabs-slider></v-tabs-slider>
      <v-tabs-item
        v-for="i in 3"
        :key="i"
        :href="'#mobile-tabs-3-' + i"
      >
        Item {{ i }}
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-content
      v-for="i in 3"
      :key="i"
      :id="'mobile-tabs-3-' + i"
    >
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tabs-content>
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
