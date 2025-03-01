<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="first"
            label="First Name"
            variant="filled"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="last"
            label="Last Name"
            variant="filled"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
  import { ref } from 'vue'

  const first = ref('John')
  const last = ref('Doe')
</script>

<script>
  export default {
    data: () => ({
      first: 'John',
      last: 'Doe',
    }),
  }
</script>
