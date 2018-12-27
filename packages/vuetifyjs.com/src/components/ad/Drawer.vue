<template>
  <v-navigation-drawer
    :value="true"
    app
    absolute
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
