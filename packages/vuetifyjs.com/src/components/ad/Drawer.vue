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
  >
    <slot />
  </v-navigation-drawer>
</template>
