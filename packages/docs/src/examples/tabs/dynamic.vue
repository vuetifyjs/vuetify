<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="red lighten-2"
      dark
    >
      <v-tab
        v-for="n in length"
        :key="n"
      >
        Item {{ n }}
      </v-tab>
    </v-tabs>
    <v-card-text class="text-xs-center">
      <v-btn text @click="length--">Remove Tab</v-btn>
      <v-divider class="mx-3" vertical></v-divider>
      <v-btn text @click="length++">Add Tab</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      length: 15,
      tab: null
    }),

    watch: {
      length (val) {
        this.tab = val - 1
      }
    }
  }
</script>
