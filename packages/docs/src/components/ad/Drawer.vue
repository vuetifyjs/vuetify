<template>
  <v-navigation-drawer
    :value="true"
    app
    class="transparent pl-4 overflow-hidden"
    clipped
    floating
    right
    stateless
    width="210"
    style="z-index: 2;"
  >
    <slot />
  </v-navigation-drawer>
</template>
