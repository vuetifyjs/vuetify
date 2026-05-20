<template>
  <v-container>
    <v-btn class="ma-2" color="primary" @click="expand = !expand">
      Expand Transition
    </v-btn>

    <v-expand-x-transition>
      <v-responsive v-show="expand" width="fit-content">
        <v-alert
          class="text-no-wrap"
          text="Smooth transition here"
          type="info"
        ></v-alert>
      </v-responsive>
    </v-expand-x-transition>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const expand = ref(false)
</script>

<script>
  export default {
    data: () => ({
      expand: false,
    }),
  }
</script>
