<template>
  <v-img
    class="rounded mx-auto"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
  export default {
    name: 'AppImg',

    inheritAttrs: false,
  }
</script>
