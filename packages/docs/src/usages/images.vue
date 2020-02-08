<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-img
        src="https://picsum.photos/id/11/500/300"
        lazy-src="https://picsum.photos/id/11/10/6"
        aspect-ratio="1"
        class="grey lighten-2"
        v-bind="attrs"
      />
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
