<template>
  <v-layout
    justify-center
    wrap
    style="min-height: 160px;"
  >
    <v-flex shrink>
      <v-btn
        class="my-3"
        color="primary"
        @click="expand = !expand"
      >
        Expand Transition
      </v-btn>

      <v-expand-transition>
        <v-card
          v-show="expand"
          height="100"
          width="100"
          class="mx-auto"
        ></v-card>
      </v-expand-transition>
    </v-flex>

    <div class="mx-3 hidden-sm-and-down"></div>

    <v-flex shrink>
      <v-btn
        class="my-3"
        color="secondary"
        @click="expand2 = !expand2"
      >
        Expand X Transition
      </v-btn>

      <v-expand-x-transition>
        <v-card
          v-show="expand2"
          height="100"
          width="100"
          class="mx-auto"
        ></v-card>
      </v-expand-x-transition>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      expand: false,
      expand2: false
    })
  }
</script>
