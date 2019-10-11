<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-badge v-bind="attrs">
        <template v-slot:badge>2</template>

        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>
