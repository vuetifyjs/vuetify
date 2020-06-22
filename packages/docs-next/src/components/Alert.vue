<template>
  <v-alert
    :class="$vuetify.theme.dark ? undefined : 'grey lighten-5'"
    border="left"
    colored-border
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-alert>
</template>

<script>
  export default { name: 'Alert' }
</script>
