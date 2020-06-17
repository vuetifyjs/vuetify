<template>
  <v-app-bar
    class="shrink"
    color="transparent"
    elevate-on-scroll
  >
    <v-spacer />

    <v-btn
      color="#7289DA"
      dark
      depressed
      href="https://discord.gg/HJXwxMy"
      large
      target="_blank"
    >
      <v-icon class="mr-3">
        $mdiDiscord
      </v-icon>

      <div class="text-body-1">
        Get Help
      </div>
    </v-btn>

    <v-spacer />
  </v-app-bar>
</template>

<script>
  export default {
    name: 'HomeBar',
  }
</script>
