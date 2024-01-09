<template>
  <div class="text-center">
    <v-chip
      class="ma-2"
      color="indigo"
      prepend-icon="mdi-account-circle"
    >
      Mike
    </v-chip>

    <v-chip
      class="ma-2"
      color="orange"
      append-icon="mdi-star"
    >
      Premium
    </v-chip>

    <v-chip
      class="ma-2"
      color="primary"
      append-icon="mdi-cake-variant"
    >
      1 Year
    </v-chip>

    <v-chip
      class="ma-2"
      color="green"
    >
      <template v-slot:prepend>
        <v-avatar
          class="green-darken-4"
        >
          1
        </v-avatar>
      </template>
      Years
    </v-chip>

    <v-chip
      class="ma-2"
      closable
      color="teal"
      prepend-icon="mdi-checkbox-marked-circle"
      :model-value="true"
    >
      Confirmed
    </v-chip>

    <v-chip
      class="ma-2"
      closable
      color="teal"
      close-icon="mdi-delete"
      prepend-icon="mdi-checkbox-marked-circle"
      :model-value="true"
    >
      Confirmed
    </v-chip>
  </div>
</template>
