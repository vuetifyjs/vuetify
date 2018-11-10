<template>
  <v-tabs dark fixed centered>
    <v-toolbar class="cyan">
      <v-text-field
        solo
        label="Search"
        append-icon="keyboard_voice"
        prepend-icon="search"
      ></v-text-field>
      <v-tabs-bar class="cyan" slot="extension">
        <v-tabs-slider class="yellow"></v-tabs-slider>
        <v-tabs-item
          v-for="i in 3"
          :key="i"
          :href="'#tab-' + i"
        >
          Item {{ i }}
        </v-tabs-item>
      </v-tabs-bar>
    </v-toolbar>
    <v-tabs-items>
      <v-tabs-content
        v-for="i in 3"
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
