<template>
  <v-container
    fluid
    class="text-center"
  >
    <v-row
      class="flex"
      justify="space-between"
    >
      <v-col cols="12">
        <v-btn @click="show = !show">
          toggle
        </v-btn>
      </v-col>

      <v-col
        cols="12"
        class="mt-12"
      >
        <v-tooltip
          v-model="show"
          location="top"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              v-bind="props"
            >
              <v-icon color="grey-lighten-1">
                mdi-cart
              </v-icon>
            </v-btn>
          </template>
          <span>Programmatic tooltip</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
      }
    },
  }
</script>
