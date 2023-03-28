<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="red-lighten-2"
    >
      <v-tab
        v-for="n in length"
        :key="n"
        :value="n"
      >
        Item {{ n }}
      </v-tab>
    </v-tabs>
    <v-card-text class="text-center">
      <v-btn
        :disabled="!length"
        variant="text"
        @click="length--"
      >
        Remove Tab
      </v-btn>
      <v-divider
        class="mx-4"
        vertical
      ></v-divider>
      <v-btn
        variant="text"
        @click="length++"
      >
        Add Tab
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      length: 15,
      tab: null,
    }),

    watch: {
      length (val) {
        this.tab = val - 1
      },
    },
  }
</script>
