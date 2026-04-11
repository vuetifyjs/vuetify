<template>
  <v-container fluid>
    <v-row wrap>

      <v-col cols="12" md="4" sm="6">
        <h5 class="mt-0 mb-2">grouping="min2"</h5>
        <v-number-input
          v-model="example1"
          :precision="0"
          grouping="min2"
        ></v-number-input>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <h5 class="mt-0 mb-2">custom separator</h5>
        <v-number-input
          v-model="example2"
          :precision="2"
          group-separator="'"
          grouping
        ></v-number-input>
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <h5 class="mt-0 mb-2">locale="de"</h5>
        <v-locale-provider locale="de">
          <v-number-input
            v-model="example3"
            :precision="2"
            grouping
          ></v-number-input>
        </v-locale-provider>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const example1 = ref(10000)
  const example2 = ref(12300000)
  const example3 = ref(250000.5)
</script>
