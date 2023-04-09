<template>
  <v-switch v-model="clickOutsideEnabled" :label="`Click outside ${clickOutsideEnabled ? 'enabled' : 'disabled'}`"></v-switch>
  <v-card
    v-click-outside="{
      handler: onClickOutside,
      closeConditional: onCloseConditional
    }"
    :color="active ? 'primary' : undefined"
    :dark="active"
    class="mx-auto"
    height="256"
    rounded="xl"
    width="256"
    @click="active = true"
  >
    <div class="text-h6 text-md-h4 fill-height d-flex align-center justify-center">
      {{ active ? 'Click Outside' : 'Click Me' }}
    </div>
  </v-card>
</template>

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
