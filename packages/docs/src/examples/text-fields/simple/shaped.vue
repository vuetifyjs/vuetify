<template>
  <v-form>
    <v-container grid-list-xl>
      <v-layout row wrap>

        <v-flex xs12 sm6>
          <v-text-field
            v-model="first"
            label="First Name"
            outlined
            shaped
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            v-model="last"
            label="Last Name"
            filled
            shaped
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
      last: 'Doe',
    }),
  }
</script>
