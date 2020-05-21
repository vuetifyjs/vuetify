<template>
  <figure>
    <v-sheet
      class="mb-2"
      color="transparent"
    >
      <v-img
        class="rounded"
        eager
        max-width="100%"
        v-bind="$attrs"
        v-on="$listeners"
      />
    </v-sheet>

    <figcaption
      class="caption text-center"
      v-text="$attrs.alt"
    />
  </figure>
</template>

<script>
  export default {
    name: 'AppImg',

    inheritAttrs: false,
  }
</script>
