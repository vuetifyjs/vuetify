<template>
  <v-toolbar
    class="v-bar--underline"
    flat
  >
    <v-list-item class="pa-0 mx-n1">
      <vuetify-logo />

      <v-spacer />

      <settings-toggle />

      <notifications />

      <jobs-link />
    </v-list-item>
  </v-toolbar>
</template>

<script>
  export default { name: 'DefaultDrawerPrepend' }
</script>
