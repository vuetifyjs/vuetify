<template>
  <v-btn
    icon
    @click="$vuetify.theme.dark = !$vuetify.theme.dark"
  >
    <v-icon>mdi-brightness-{{ $vuetify.theme.dark ? '4' : '7' }}</v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: 'BaseThemeToggle',

    watch: {
      '$vuetify.theme.dark' (val) {
        localStorage.setItem('vuetify__documentation__theme', val)
      },
    },
  }
</script>
