<template>
  <v-app-bar
    class="shrink"
    color="transparent"
    elevate-on-scroll
  >
    <v-spacer />

    <v-btn
      color="primary"
      outlined
      x-large
      :to="{
        name: 'Documentation',
        params: {
          category: 'getting-started',
          page: 'quick-start'
        }
      }"
    >
      To Documentation

      <v-icon right>
        $mdiOpenInNew
      </v-icon>
    </v-btn>

    <v-spacer />
  </v-app-bar>
</template>

<script>
  export default {
    name: 'HomeBar',
  }
</script>
