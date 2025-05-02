<template>
  <v-container>
    <v-row justify="center">
      <v-col class="text-center">
        <v-btn
          color="primary"
          @click="show = !show"
        >
          My Transition
        </v-btn>

        <MyTransition>
          <v-card
            v-show="show"
            width="100"
            height="100"
            color="secondary"
            class="mx-auto mt-5"
          ></v-card>
        </MyTransition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { createCssTransition } from 'vuetify/components/transitions';

const MyTransition = createCssTransition('my-transition')

const show = ref(false)
</script>

<style lang="scss">
.my-transition {
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
