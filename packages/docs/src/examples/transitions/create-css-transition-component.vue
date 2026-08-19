<template>
  <v-container>
    <v-row class="justify-center" style="min-height: 160px;">
      <v-col class="text-center">
        <v-btn
          color="primary"
          @click="show = !show"
        >
          Component Transition
        </v-btn>

        <ComponentTransition>
          <v-card
            v-show="show"
            class="mx-auto mt-5"
            color="secondary"
            height="100"
            width="100"
          ></v-card>
        </ComponentTransition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { createCssTransition } from 'vuetify/util/transitions'

  const ComponentTransition = createCssTransition('component-transition')

  const show = ref(false)
</script>

<style lang="scss">
  .component-transition {
    &-enter-active,
    &-leave-active {
      transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: rotate(180deg) scale(0.2) skew(20deg);
      filter: hue-rotate(90deg);
    }
  }
</style>
