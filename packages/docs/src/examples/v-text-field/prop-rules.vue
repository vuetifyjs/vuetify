<template>
  <v-responsive
    class="mx-auto"
    max-width="344"
  >
    <v-text-field
      :rules="[
        v => !!v || 'Field is required'
      ]"
      clearable
      label="Last name"
    ></v-text-field>
  </v-responsive>
</template>
