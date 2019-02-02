<template>
  <div class="text-xs-center">
    <v-layout justify-space-around>
      <v-btn
        dark
        color="primary"
        @click="expand = !expand"
      >Expand Transition</v-btn>

      <v-flex shrink>
        <v-expand-x-transition>
          <div v-show="expand" style="white-space: nowrap">
            <v-btn flat>
              <v-icon>star_border</v-icon>
            </v-btn>
            <v-btn flat>
              <v-icon>settings</v-icon>
            </v-btn>
            <v-btn flat>
              <v-icon>power</v-icon>
            </v-btn>
          </div>
        </v-expand-x-transition>
      </v-flex>
    </v-layout>

    <v-expand-transition>
      <div v-show="expand">
        <v-btn flat>
          <v-icon>star_border</v-icon>
        </v-btn>
        <v-btn flat>
          <v-icon>settings</v-icon>
        </v-btn>
        <v-btn flat>
          <v-icon>power</v-icon>
        </v-btn>
      </div>
    </v-expand-transition>
  </div>
</template>
<script>
  export default {
    data: () => ({
      expand: false
    })
  }
</script>
