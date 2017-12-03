<template>
  <v-card id="create">
    <v-container fluid grid-list-md>
      <v-layout child-flex wrap>
        <v-flex xs12 sm6 md4>
          <v-subheader>Options</v-subheader>
          <v-checkbox v-model="hover" label="Open on hover" hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-subheader>FAB location</v-subheader>
          <v-checkbox v-model="top" label="Top" hide-details></v-checkbox>
          <v-checkbox v-model="right" label="Right" hide-details></v-checkbox>
          <v-checkbox v-model="bottom" label="Bottom" hide-details></v-checkbox>
          <v-checkbox v-model="left" label="Left" hide-details></v-checkbox>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-subheader>Speed dial direction</v-subheader>
          <v-radio v-model="direction" value="top" label="Top" hide-details></v-radio>
          <v-radio v-model="direction" value="right" label="Right" hide-details></v-radio>
          <v-radio v-model="direction" value="bottom" label="Bottom" hide-details></v-radio>
          <v-radio v-model="direction" value="left" label="Left" hide-details></v-radio>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-subheader>Transition</v-subheader>
          <v-radio v-model="transition" value="slide-y-transition" label="Slide y" hide-details></v-radio>
          <v-radio v-model="transition" value="slide-y-reverse-transition" label="Slide y reverse" hide-details></v-radio>
          <v-radio v-model="transition" value="slide-x-transition" label="Slide x" hide-details></v-radio>
          <v-radio v-model="transition" value="slide-x-reverse-transition" label="Slide x reverse" hide-details></v-radio>
          <v-radio v-model="transition" value="scale-transition" label="Scale" hide-details></v-radio>
        </v-flex>
      </v-layout>
    </v-container>
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :hover="hover"
      :transition="transition"
    >
      <v-btn
        slot="activator"
        class="blue darken-2"
        dark
        fab
        hover
        v-model="fab"
      >
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        class="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        class="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        class="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition'
    }),

    watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      }
    },

    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { 'class': 'purple', icon: 'account_circle' }
          case 'two': return { 'class': 'red', icon: 'edit' }
          case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      }
    }
  }
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .speed-dial {
    position: absolute;
  }

  #create .btn--floating {
    position: relative;
  }
</style>
