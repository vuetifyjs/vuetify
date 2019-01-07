<template>
  <v-content>
    <v-container text-xs-center>
      <v-layout column>
        <h2 class="display-3 center">What would you like to cook today?</h2>
        <v-select
          :items="meals"
          v-model="meal"
          label="Meals"
        />
        <v-btn
          :to="meal"
          large
          color="accent"
          class="center"
        >
          Let's cook it!
        </v-btn>
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
    meal: ''
  })
}
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
