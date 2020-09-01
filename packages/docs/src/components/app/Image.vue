<template>
  <app-sheet>
    <v-img
      rounded
      v-bind="$attrs"
      v-on="$listeners"
    />
  </app-sheet>
</template>

<script>
  export default {
    name: 'AppImg',

    inheritAttrs: false,
  }
</script>
