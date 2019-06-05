<template>
  <v-flex :align-self-center="center">
    <slot>
      Content
    </slot>
  </v-flex>
</template>

<script>
  export default {
    name: 'CoreSection',
    props: {
      center: Boolean,
    },
  }
</script>
