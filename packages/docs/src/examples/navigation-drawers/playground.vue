<template>
  <v-layout column align-stretch>
    <v-layout row wrap justify-space-around>
      <v-flex xs12>
        <v-select v-model="color" :items="colors" label="Color"></v-select>
      </v-flex>
      <v-switch v-model="drawer" class="ma-2" label="v-model"></v-switch>
      <v-switch v-model="miniVariant" class="ma-2" label="Mini variant"></v-switch>
      <v-switch v-model="expandOnHover" class="ma-2" label="Expand on hover"></v-switch>
      <v-switch v-model="background" class="ma-2" label="Background"></v-switch>
      <v-switch v-model="dark" class="ma-2" label="Dark"></v-switch>
      <v-switch v-model="permanent" class="ma-2" label="Permanent"></v-switch>
      <v-switch v-model="temporary" class="ma-2" label="Temporary"></v-switch>
      <v-switch v-model="absolute" class="ma-2" label="Absolute"></v-switch>
      <v-switch v-model="bottom" class="ma-2" label="Bottom"></v-switch>
      <v-switch v-model="right" class="ma-2" label="Right"></v-switch>
      <v-flex xs12 text-xs-center pb-2>
        <span>Position: </span>
        <v-btn class="ma-2" @click="reset">Normal</v-btn>
        <v-btn class="ma-2" @click="setBottom">Bottom</v-btn>
        <v-btn class="ma-2" @click="setRight">Right</v-btn>
      </v-flex>
    </v-layout>
    <v-card
      height="400"
    >
      <v-navigation-drawer
        :v-model="drawer"
        :color="color"
        :right="right"
        :bottom="bottom"
        :mini-variant="miniVariant"
        :expand-on-hover="expandOnHover"
        :src="bg"
        :dark="dark"
        :temporary="temporary"
        :permanent="permanent"
        :absolute="absolute"
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Application</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
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
        drawer: true,
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        dark: false,
        permanent: true,
        temporary: false,
        absolute: false,
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        bottom: false,
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
    methods: {
      reset () {
        this.permanent = true
        this.right = this.bottom = this.absolute = this.temporary = false
      },
      setRight () {
        this.right = this.permanent = this.absolute = true
        this.bottom = this.temporary = false
      },
      setBottom () {
        this.bottom = this.temporary = this.absolute = true
        this.right = this.permanent = false
      },
    },
  }
</script>
