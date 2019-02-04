<template>
  <div class="text-xs-center">
    <v-chip
      class="ma-2"
      color="indigo"
      text-color="white"
    >
      <v-avatar left>
        <v-icon>account_circle</v-icon>
      </v-avatar>
      Ranee
    </v-chip>

    <v-chip
      class="ma-2"
      color="orange"
      text-color="white"
    >
      Premium
      <v-icon right>star</v-icon>
    </v-chip>

    <v-chip
      class="ma-2"
      color="primary"
      text-color="white"
    >
      1 Year
      <v-icon right>cake</v-icon>
    </v-chip>

    <v-chip
      class="ma-2"
      color="green"
      text-color="white"
    >
      <v-avatar
        left
        class="green darken-4"
      >
        1
      </v-avatar>
      Years
    </v-chip>

    <v-chip
      class="ma-2"
      close
      color="teal"
      text-color="white"
      @click:close="close"
    >
      <v-avatar left>
        <v-icon>check_circle</v-icon>
      </v-avatar>
      Confirmed
    </v-chip>
  </div>
</template>

<script>
  export default {
    methods: {
      close () {
        alert('Chip close clicked')
      }
    }
  }
</script>
