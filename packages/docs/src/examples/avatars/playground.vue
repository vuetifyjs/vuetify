<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-avatar
        v-bind="{
          ...attrs,
          color: attrs.color || (attrs.image ? undefined : 'primary')
        }"
      >
        <img
          v-if="attrs.image"
          alt="avatar"
          src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
        >
        <span v-else class="white--text">VJ</span>
      </v-avatar>
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
