<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-btn
        v-bind="{
          ...attrs,
          color: attrs.color || 'deep-purple accent-4',
          [attrs.size]: true
        }"
        class="white--text"
      >
        <v-icon v-if="attrs.fab || attrs.icon">mdi-account</v-icon>

        <span v-else>Click Me</span>
      </v-btn>
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
