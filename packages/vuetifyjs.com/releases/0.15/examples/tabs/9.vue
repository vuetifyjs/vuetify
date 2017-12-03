<template>
  <v-tabs dark :scrollable="false">
    <v-tabs-bar class="cyan">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item
        v-for="i in 5"
        :key="i"
        :href="'#tab-' + i"
      >
        Item {{ i }}
      </v-tabs-item>
      <v-menu>
        <v-tabs-item slot="activator">
          Menu
          <v-icon>arrow_drop_down</v-icon>
        </v-tabs-item>
        <v-list v-for="n in 4" v-bind:key="n">
          <v-list-tile @click="">Item {{ n }}</v-list-tile>
        </v-list>
      </v-menu>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for="i in 5"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tabs-content>
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
