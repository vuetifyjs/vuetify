<template>
  <v-card
    :color="active ? 'primary' : undefined"
    :dark="active"
    class="mx-auto"
    height="256"
    rounded="xl"
    width="256"
    v-click-outside="{
      handler: onClickOutside,
      include
    }"
    @click="active = true"
  >
    <div class="text-h6 text-md-h4 fill-height d-flex align-center justify-center">
      {{ active ? 'Click Outside' : 'Click Me' }}
    </div>
  </v-card>

  <div class="d-flex justify-center">
    <v-card
      class="ma-2 included"
      rounded="lg"
    >
      <v-card-text class="text-h6">
        This element is included
      </v-card-text>
    </v-card>

    <v-card
      class="ma-2"
      rounded="lg"
    >
      <v-card-text class="text-h6">
        This element is not included
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const active = ref(false)

  function onClickOutside () {
    active.value = false
  }
  function include () {
    return [document.querySelector('.included')]
  }
</script>

<script>
  export default {
    data: () => ({
      active: false,
    }),
    methods: {
      onClickOutside () {
        this.active = false
      },
      include () {
        return [document.querySelector('.included')]
      },
    },
  }
</script>
