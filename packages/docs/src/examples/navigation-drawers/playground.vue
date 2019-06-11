<template>
  <v-layout column align-stretch>
    <v-layout row wrap justify-space-around>
      <v-flex xs12>
        <v-select v-model="color" :items="colors" label="Color"></v-select>
      </v-flex>
      <v-switch v-model="permanent" class="ma-2" label="Permanent"></v-switch>
      <v-switch v-model="right" class="ma-2" label="Right"></v-switch>
      <v-switch v-model="floating" class="ma-2" label="Floating"></v-switch>
      <v-switch v-model="miniVariant" class="ma-2" label="Mini variant"></v-switch>
      <v-switch v-model="expandOnHover" class="ma-2" label="Expand on hover"></v-switch>
      <v-switch v-model="background" class="ma-2" label="Background"></v-switch>
    </v-layout>
    <v-card
      height="400"
    >
      <v-navigation-drawer
        :color="color"
        :permanent="permanent"
        :right="right"
        :floating="floating"
        :mini-variant="miniVariant"
        :expand-on-hover="expandOnHover"
        :src="bg"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Application
            </v-list-item-title>
            <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        permanent: true,
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        floating: false,
        miniVariant: false,
        expandOnHover: false,
        background: false,
      }
    },

    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
  }
</script>
