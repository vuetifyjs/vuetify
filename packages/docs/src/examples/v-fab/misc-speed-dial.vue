<template>
  <v-app>
    <v-card class="pa-6 mb-6" variant="flat">
      <v-row density="comfortable">
        <v-col cols="12" sm="3">
          <h5>FAB position</h5>

          <v-radio-group v-model="fabPosition" density="compact" hide-details>
            <v-radio label="App (fixed)" value="fixed"></v-radio>
            <v-radio label="Absolute" value="absolute"></v-radio>
            <v-radio label="None" value=""></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12" sm="3">
          <h5>FAB location</h5>

          <v-radio-group v-model="fabLocation" :disabled="!fabPosition" density="compact" hide-details>
            <div class="d-flex">
              <v-radio value="top left"></v-radio>
              <v-radio value="top center"></v-radio>
              <v-radio value="top right"></v-radio>
            </div>

            <div class="d-flex">
              <v-radio value="left center"></v-radio>
              <v-radio :disabled="fabPosition !== 'absolute'" value="center center"></v-radio>
              <v-radio value="right center"></v-radio>
            </div>

            <div class="d-flex">
              <v-radio value="left bottom"></v-radio>
              <v-radio value="bottom center"></v-radio>
              <v-radio value="right bottom"></v-radio>
            </div>
          </v-radio-group>

          <code>({{ fabLocation }})</code>
        </v-col>

        <v-col cols="12" sm="3">
          <h5>Menu location</h5>

          <v-radio-group v-model="menuLocation" density="compact" hide-details>
            <div class="d-flex">
              <v-radio disabled></v-radio>
              <v-radio value="top left"></v-radio>
              <v-radio value="top center"></v-radio>
              <v-radio value="top right"></v-radio>
              <v-radio disabled></v-radio>
            </div>

            <div class="d-flex">
              <v-radio value="left top"></v-radio>
              <v-radio disabled></v-radio>
              <v-radio disabled></v-radio>
              <v-radio disabled></v-radio>
              <v-radio value="right top"></v-radio>
            </div>

            <div class="d-flex">
              <v-radio value="left center"></v-radio>
              <v-radio disabled></v-radio>
              <v-radio value="center"></v-radio>
              <v-radio disabled></v-radio>
              <v-radio value="right center"></v-radio>
            </div>

            <div class="d-flex">
              <v-radio value="left bottom"></v-radio>
              <v-radio disabled></v-radio>
              <v-radio disabled></v-radio>
              <v-radio disabled></v-radio>
              <v-radio value="right bottom"></v-radio>
            </div>

            <div class="d-flex">
              <v-radio disabled></v-radio>
              <v-radio value="bottom left"></v-radio>
              <v-radio value="bottom center"></v-radio>
              <v-radio value="bottom right"></v-radio>
              <v-radio disabled></v-radio>
            </div>
          </v-radio-group>

          <code>({{ menuLocation }})</code>
        </v-col>

        <v-col cols="12" sm="3">
          <h5>Transition</h5>

          <v-radio-group v-model="transition" density="compact" hide-details>
            <v-radio label="Fade" value="fade-transition"></v-radio>
            <v-radio label="Slide y" value="slide-y-transition"></v-radio>
            <v-radio label="Slide y reverse" value="slide-y-reverse-transition"></v-radio>
            <v-radio label="Slide x" value="slide-x-transition"></v-radio>
            <v-radio label="Slide x reverse" value="slide-x-reverse-transition"></v-radio>
            <v-radio label="Scale" value="scale-transition"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-card>

    <v-card :class="fabPosition === 'absolute' ? 'demo-panel-relative' : 'demo-panel-static'" border flat>
      <v-fab
        :key="fabPosition"
        :absolute="fabPosition === 'absolute'"
        :app="fabPosition === 'fixed'"
        :color="open ? '' : 'primary'"
        :location="fabLocation"
        size="large"
        icon
      >
        <v-icon>{{ open ? 'mdi-close' : 'mdi-crown' }}</v-icon>
        <v-speed-dial v-model="open" :location="menuLocation" :transition="transition" activator="parent">
          <v-btn key="1" color="success" icon>
            <v-icon size="24">$success</v-icon>
          </v-btn>

          <v-btn key="2" color="info" icon>
            <v-icon size="24">$info</v-icon>
          </v-btn>

          <v-btn key="3" color="warning" icon>
            <v-icon size="24">$warning</v-icon>
          </v-btn>

          <v-btn key="4" color="error" icon>
            <v-icon size="24">$error</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-fab>
    </v-card>
  </v-app>
</template>

<script setup>
  import { shallowRef, watch } from 'vue'

  const open = shallowRef(false)
  const fabPosition = shallowRef('absolute')
  const menuLocation = shallowRef('left center')
  const fabLocation = shallowRef('right bottom')
  const transition = shallowRef('slide-y-reverse-transition')

  watch(menuLocation, reopen)
  watch(transition, reopen)
  watch(fabLocation, () => open.value = false)
  watch(fabPosition, () => open.value = false)

  function reopen () {
    open.value = false
    setTimeout(() => open.value = true, 400)
  }
</script>

<style scoped>
/* This is for documentation purposes and will not be needed in your application */
::v-deep(.v-application__wrap) {
  min-height: 0 !important;
}

.demo-panel-static,
.demo-panel-relative {
  margin: 0 80px 50px;
  padding: 24px;
  min-height: 300px;
}
.demo-panel-static {
  position: static;
}
.demo-panel-relative {
  position: relative;
}

.v-selection-control--disabled,
.v-input--disabled .v-selection-control {
  opacity: .1;
}

.v-radio {
  flex-grow: 0 !important;
}

h5 {
  margin-bottom: 12px;
}

code {
  display: block;
  font-size: .8rem;
  margin-top: 12px;
}

::v-deep(.v-label) {
  margin-left: 8px;
}
</style>
