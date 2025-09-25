<template>
  <v-app>
    <v-container>
      <v-btn class="ma-2" color="primary" @click="expand = !expand">
        Expand Transition
      </v-btn>

      <v-expand-transition>
        <div v-show="expand">
          <v-alert text="Smooth transition here" type="info"></v-alert>
        </div>
      </v-expand-transition>
    </v-container>
  </v-app>
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
