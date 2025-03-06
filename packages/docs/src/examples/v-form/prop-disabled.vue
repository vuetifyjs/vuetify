<template>
  <v-sheet class="mx-auto" width="300">
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

<script setup>
  import { ref } from 'vue'

  const firstName = ref('')
  const lastName = ref('')
</script>

<script>
  export default {
    data: () => ({
      firstName: '',
      lastName: '',
    }),
  }
</script>
