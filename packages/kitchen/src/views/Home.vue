<template>
  <v-container>
    <v-layout column>
      <h1 class="display-4 center">Oh no, we have no food!</h1>
      <h2 class="display-3 center">Chef, what will we cook?</h2>
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
