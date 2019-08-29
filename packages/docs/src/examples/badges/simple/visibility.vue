<template>
  <v-container fluid class="text-center">
    <v-row
      justify="space-between"
    >
      <v-col cols="12">
        <v-btn
          color="indigo"
          class="white--text"
          @click="show = !show"
        >
          Toggle
        </v-btn>
      </v-col>

      <v-col cols="12" class="mt-12">
        <v-badge
          v-model="show"
          color="cyan"
          left
        >
          <template v-slot:badge>
            <span>6</span>
          </template>
          <v-icon
            large
            color="grey lighten-1"
          >shopping_cart</v-icon>
        </v-badge>

        <v-badge
          v-model="show"
          color="purple"
        >
          <template v-slot:badge>
            <span>6</span>
          </template>
          <v-icon large color="grey">mdi-email</v-icon>
        </v-badge>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show: true,
      }
    },
  }
</script>
