<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-icon>{{ icons.mdiAccount }}</v-icon>
    <div class="mx-2"></div>
    <v-icon>{{ icons.mdiPencil }}</v-icon>
    <div class="mx-2"></div>
    <v-icon>{{ icons.mdiShareVariant }}</v-icon>
    <div class="mx-2"></div>
    <v-btn
      color="primary"
      depressed
    >
      <v-icon left>
        {{ icons.mdiDelete }}
      </v-icon>
      Delete
    </v-btn>
  </v-row>
</template>

<script>
  import {
    mdiAccount,
    mdiPencil,
    mdiShareVariant,
    mdiDelete,
  } from '@mdi/js'

  export default {
    data: () => ({
      icons: {
        mdiAccount,
        mdiPencil,
        mdiShareVariant,
        mdiDelete,
      },
    }),
  }
</script>
