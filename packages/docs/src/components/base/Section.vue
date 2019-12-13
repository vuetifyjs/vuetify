<template>
  <v-container
    class="py-6 py-md-12"
    fluid
    tag="section"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-container>
</template>

<script>
  export default {
    name: 'BaseSection',
  }
</script>
