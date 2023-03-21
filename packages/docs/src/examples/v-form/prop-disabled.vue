<template>
  <v-sheet width="300" class="mx-auto">
    <v-form disabled>
      <v-text-field
        v-model="firstName"
        label="First name"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        label="Last name"
      ></v-text-field>
    </v-form>
  </v-sheet>
</template>

<script>
  export default {
    data: () => ({
      firstName: '',
      lastName: '',
    }),
  }
</script>
