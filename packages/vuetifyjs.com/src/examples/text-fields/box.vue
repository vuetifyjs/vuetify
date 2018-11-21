<template>
  <v-form>
    <v-container>
      <v-layout row wrap>

        <v-flex xs12 sm6>
          <v-text-field
            v-model="first"
            label="First Name"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            v-model="last"
            label="Last Name"
            box
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      first: 'John',
      last: 'Doe'
    })
  }
</script>
