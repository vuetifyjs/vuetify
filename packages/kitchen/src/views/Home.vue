<template>
  <v-content>
    <v-container
      text-center
      pt-12
    >
      <v-layout justify-center>
        <v-flex
          xs12
          md6
        >
          <h2 class="display-3 mb-12">
            What'll it be?
          </h2>
          <v-autocomplete
            v-model="meal"
            :items="meals"
            label="Meals"
            solo
          />
          <v-btn
            :to="meal"
            large
            color="primary"
            class="subheading"
          >
            Let's cook it!
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import meals from '../pan'

  export default {
    name: 'Home',

    data: () => ({
      meals,
      meal: '',
    }),
  }
</script>
