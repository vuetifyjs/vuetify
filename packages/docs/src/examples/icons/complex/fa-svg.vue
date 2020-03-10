<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-icon>{{ icons.faEdit }}</v-icon>
    <div class="mx-2"></div>
    <v-icon>{{ icons.faCoffee }}</v-icon>
    <div class="mx-2"></div>
    <v-icon>{{ icons.faInbox }}</v-icon>
    <div class="mx-2"></div>
    <v-btn
      color="primary"
      depressed
    >
      <v-icon left>{{ icons.faComments }}</v-icon>
      Comment
    </v-btn>
  </v-row>
</template>

<script>
  import {
    faEdit,
    faCoffee,
    faInbox,
    faComments,
  } from '@fortawesome/free-solid-svg-icons'

  export default {
    data: () => ({
      icons: {
        faEdit,
        faCoffee,
        faInbox,
        faComments,
      },
    }),
  }
</script>
