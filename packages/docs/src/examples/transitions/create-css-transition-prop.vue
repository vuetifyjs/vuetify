<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="text-center">
        <v-menu transition="custom-prop-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
              Prop Transition
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="n in 5"
              :key="n"
            >
              <v-list-item-title>
                Item {{ n }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { createCssTransition } from 'vuetify/util/transitions'

  createCssTransition('custom-prop-transition')
</script>

<style lang="scss">
.custom-prop-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform-origin: top center;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scaleY(0) rotateX(-60deg);
    transform-origin: top center;
    filter: saturate(2) hue-rotate(90deg);
  }
}
</style>
