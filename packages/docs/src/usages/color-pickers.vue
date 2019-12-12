<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-color-picker
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
