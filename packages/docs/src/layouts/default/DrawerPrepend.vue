<template>
  <v-toolbar
    class="v-bar--underline"
    flat
  >
    <v-list-item class="pa-0 mx-n1">
      <vuetify-logo :to="{ name: 'Home' }" />

      <v-spacer />

      <releases-menu />
    </v-list-item>
  </v-toolbar>
</template>

<script>
  export default { name: 'DefaultDrawerPrepend' }
</script>
