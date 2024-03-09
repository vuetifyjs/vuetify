<template>
  <v-row
    justify="center"

    style="min-height: 160px;"
  >
    <v-col class="shrink">
      <v-btn
        class="ma-2"
        color="primary"
        @click="expand = !expand"
      >
        Expand Transition
      </v-btn>

      <v-expand-transition>
        <v-card
          v-show="expand"
          class="mx-auto bg-secondary"
          height="100"
          width="100"
        ></v-card>
      </v-expand-transition>
    </v-col>

    <div class="mx-4 hidden-sm-and-down"></div>

    <v-col class="shrink">
      <v-btn
        class="ma-2"
        color="secondary"
        @click="expand2 = !expand2"
      >
        Expand X Transition
      </v-btn>

      <v-expand-x-transition>
        <v-card
          v-show="expand2"
          class="mx-auto bg-secondary"
          height="100"
          width="100"
        ></v-card>
      </v-expand-x-transition>
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const expand = ref(false)
  const expand2 = ref(false)
</script>

<script>
  export default {
    data: () => ({
      expand: false,
      expand2: false,
    }),
  }
</script>
