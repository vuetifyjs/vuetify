<template>
  <v-row
    justify="space-around"
    align="center"
  >
    <v-chip
      class="ma-2"
      :input-value="active"
      filter
    >
      I'm v-chip
    </v-chip>

    <v-chip
      class="ma-2"
      :input-value="active"
      filter
      filter-icon="mdi-plus"
    >
      I'm v-chip
    </v-chip>

    <v-chip
      class="ma-2"
      :input-value="active"
      filter
      filter-icon="mdi-minus"
    >
      I'm v-chip
    </v-chip>

    <v-switch
      v-model="active"
      label="Active"
    ></v-switch>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      active: false,
    }),
  }
</script>
