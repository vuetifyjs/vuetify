<template>
  <v-card id="create">
    <v-container fluid>
      <v-row class="child-flex">
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-subheader>Options</v-subheader>
          <v-checkbox
            v-model="hover"
            label="Open on hover"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-subheader>FAB location</v-subheader>
          <v-checkbox
            v-model="top"
            label="Top"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="right"
            label="Right"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="bottom"
            label="Bottom"
            hide-details
          ></v-checkbox>
          <v-checkbox
            v-model="left"
            label="Left"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-subheader>Speed dial direction</v-subheader>
          <v-radio-group
            v-model="direction"
            hide-details
          >
            <v-radio
              value="top"
              label="Top"
            ></v-radio>
            <v-radio
              value="right"
              label="Right"
            ></v-radio>
            <v-radio
              value="bottom"
              label="Bottom"
            ></v-radio>
            <v-radio
              value="left"
              label="Left"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-subheader>Transition</v-subheader>
          <v-radio-group
            v-model="transition"
            hide-details
          >
            <v-radio
              value="slide-y-transition"
              label="Slide y"
            ></v-radio>
            <v-radio
              value="slide-y-reverse-transition"
              label="Slide y reverse"
            ></v-radio>
            <v-radio
              value="slide-x-transition"
              label="Slide x"
            ></v-radio>
            <v-radio
              value="slide-x-reverse-transition"
              label="Slide x reverse"
            ></v-radio>
            <v-radio
              value="scale-transition"
              label="Scale"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    }),

    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { class: 'purple', icon: 'account_circle' }
          case 'two': return { class: 'red', icon: 'edit' }
          case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      },
    },

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
      },
    },
  }
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
