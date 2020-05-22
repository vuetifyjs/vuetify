<template>
  <v-app-bar app>
    <v-toolbar-title>Application</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-btn
        text
        @click="translate"
      >
        <v-icon>$translate</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'DefaultBar',

    methods: {
      translate () {
        setTimeout(() => {
          this.$router.go()
        }, 1000)
        this.$router.replace({ params: { lang: 'eo-UY' } })
      },
    },
  }
</script>
