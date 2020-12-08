<template>
  <div class="text-center">
    <v-chip
      class="ma-2"
      color="indigo"
      text-color="white"
    >
      <v-avatar left>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      Mike
    </v-chip>

    <v-chip
      class="ma-2"
      color="orange"
      text-color="white"
    >
      Premium
      <v-icon right>
        mdi-star
      </v-icon>
    </v-chip>

    <v-chip
      class="ma-2"
      color="primary"
      text-color="white"
    >
      1 Year
      <v-icon right>
        mdi-cake-variant
      </v-icon>
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
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-avatar>
      Confirmed
    </v-chip>

    <v-chip
      class="ma-2"
      close
      color="teal"
      text-color="white"
      close-icon="mdi-delete"
      @click:close="close"
    >
      <v-avatar left>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
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
      },
    },
  }
</script>
