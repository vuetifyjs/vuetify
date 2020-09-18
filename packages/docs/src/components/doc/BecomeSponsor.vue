<template>
  <v-btn
    large
    href="https://github.com/users/johnleider/sponsorship"
  >
    <v-icon left>
      $mdiGithub
    </v-icon>
    {{ $t('become-a-sponsor') }}
  </v-btn>
</template>

<script>
  export default {
    name: 'BecomeSponsor',
  }
</script>
