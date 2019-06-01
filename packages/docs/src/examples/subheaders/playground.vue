<template>
  <div class="grey lighten-5 pa-3">
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        md8
        sm4
      >
        <v-card>
          <v-subheader :inset="inset">Subheader</v-subheader>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout
      class="mt-5"
      align-center
      justify-center
    >
      <v-flex
        xs12
        md8
      >
        <template>
          <v-checkbox
            v-model="inset"
            hide-details
            label="Inset"
            light
          ></v-checkbox>
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      inset: false
    })
  }
</script>
