<template>
  <v-sheet
    class="mx-auto"
    max-width="700"
  >
    <v-slide-group multiple>
      <v-slide-item
        v-for="n in 25"
        :key="n"
        v-slot:default="{ active, toggle }"
      >
        <v-btn
          :input-value="active"
          active-class="purple white--text"
          depressed
          rounded
          @click="toggle"
        >
          Options {{ n }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>
