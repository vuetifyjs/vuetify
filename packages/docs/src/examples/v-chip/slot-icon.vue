<template>
  <div class="text-center">
    <v-chip
      class="ma-2"
      color="indigo"
      prepend-icon="i-mdi:account-circle"
    >
      Mike
    </v-chip>

    <v-chip
      append-icon="i-mdi:star"
      class="ma-2"
      color="orange"
    >
      Premium
    </v-chip>

    <v-chip
      append-icon="i-mdi:cake-variant"
      class="ma-2"
      color="primary"
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
      :model-value="true"
      class="ma-2"
      color="teal"
      prepend-icon="i-mdi:checkbox-marked-circle"
      closable
    >
      Confirmed
    </v-chip>

    <v-chip
      :model-value="true"
      class="ma-2"
      close-icon="i-mdi:delete"
      color="teal"
      prepend-icon="i-mdi:checkbox-marked-circle"
      closable
    >
      Confirmed
    </v-chip>
  </div>
</template>
