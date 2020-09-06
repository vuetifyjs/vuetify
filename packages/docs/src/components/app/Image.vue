<template>
  <v-img
    class="rounded"
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
