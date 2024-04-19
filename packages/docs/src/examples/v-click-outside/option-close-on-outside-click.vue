<template>
  <v-switch v-model="clickOutsideEnabled" :label="`Click outside ${clickOutsideEnabled ? 'enabled' : 'disabled'}`"></v-switch>
  <v-card
    :color="active ? 'primary' : undefined"
    :dark="active"
    class="mx-auto"
    height="256"
    rounded="xl"
    width="256"
    v-click-outside="{
      handler: onClickOutside,
      closeConditional: onCloseConditional
    }"
    @click="active = true"
  >
    <div class="text-h6 text-md-h4 fill-height d-flex align-center justify-center">
      {{ active ? 'Click Outside' : 'Click Me' }}
    </div>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const active = ref(false)
  const clickOutsideEnabled = ref(false)

  function onClickOutside () {
    active.value = false
  }
  function onCloseConditional (e) {
    return clickOutsideEnabled.value
  }
</script>

<script>
  export default {
    data: () => ({
      active: false,
      clickOutsideEnabled: false,
    }),

    methods: {
      onClickOutside () {
        this.active = false
      },
      onCloseConditional (e) {
        return this.clickOutsideEnabled
      },
    },
  }
</script>
