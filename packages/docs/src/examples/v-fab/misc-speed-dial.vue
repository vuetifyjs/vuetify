<template>
  <v-card id="create">
    <v-container fluid>
      <v-row class="child-flex">
        <v-col
          cols="12"
          md="4"
          sm="6"
        >
          <div class="text-subheader-2 pa-2">Options</div>
          <v-checkbox
            v-model="hover"
            label="Open on hover"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col
          cols="12"
          md="4"
          sm="6"
        >
          <div class="text-subheader-2 pa-2">FAB location</div>
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
          md="4"
          sm="6"
        >
          <div class="text-subheader-2 pa-2">Speed dial direction</div>
          <v-radio-group
            v-model="direction"
            hide-details
          >
            <v-radio
              label="Top"
              value="top"
            ></v-radio>
            <v-radio
              label="Right"
              value="right"
            ></v-radio>
            <v-radio
              label="Bottom"
              value="bottom"
            ></v-radio>
            <v-radio
              label="Left"
              value="left"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col
          cols="12"
          md="4"
          sm="6"
        >
          <div class="text-subheader-2 pa-2">Transition</div>
          <v-radio-group
            v-model="transition"
            hide-details
          >
            <v-radio
              label="Slide y"
              value="slide-y-transition"
            ></v-radio>
            <v-radio
              label="Slide y reverse"
              value="slide-y-reverse-transition"
            ></v-radio>
            <v-radio
              label="Slide x"
              value="slide-x-transition"
            ></v-radio>
            <v-radio
              label="Slide x reverse"
              value="slide-x-reverse-transition"
            ></v-radio>
            <v-radio
              label="Scale"
              value="scale-transition"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
    <v-speed-dial
      v-model="fab"
      :bottom="bottom"
      :direction="direction"
      :left="left"
      :open-on-hover="hover"
      :right="right"
      :top="top"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue-darken-2"
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
        color="green"
        size="small"
        dark
        fab
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        color="indigo"
        size="small"
        dark
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        color="red"
        size="small"
        dark
        fab
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const direction = ref('top')
  const fab = ref(false)
  const hover = ref(false)
  const top = ref(false)
  const right = ref(true)
  const bottom = ref(true)
  const left = ref(false)
  const transition = ref('slide-y-reverse-transition')
  watch(top, val => {
    bottom.value = !val
  })
  watch(right, val => {
    left.value = !val
  })
  watch(bottom, val => {
    top.value = !val
  })
  watch(left, val => {
    right.value = !val
  })
</script>

<script>
  export default {
    data: () => ({
      direction: 'top',
      fab: false,
      hover: false,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
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
