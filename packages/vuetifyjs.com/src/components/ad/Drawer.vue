<template>
  <v-navigation-drawer
    :value="true"
    app
    class="transparent pa-3"
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
