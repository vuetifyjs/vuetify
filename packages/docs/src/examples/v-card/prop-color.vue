<template>
  <v-row class="justify-center">
    <v-col cols="auto">
      <v-radio-group
        v-model="color"
        hide-details
        inline
      >
        <v-radio
          color="indigo"
          label="indigo"
          value="indigo"
        ></v-radio>

        <v-radio
          color="indigo-darken-3"
          label="indigo-darken-3"
          value="indigo-darken-3"
        ></v-radio>

        <v-radio
          color="primary"
          label="primary"
          value="primary"
        ></v-radio>

        <v-radio
          color="secondary"
          label="secondary"
          value="secondary"
        ></v-radio>
      </v-radio-group>
    </v-col>

    <v-col
      v-for="(variant, i) in variants"
      :key="i"
      cols="12"
      md="6"
    >
      <v-card
        :color="color"
        :variant="variant"
        class="mx-auto"
      >
        <v-card-item>
          <div>
            <div class="text-label-medium text-uppercase mt-2 mb-3">
              {{ variant }}
            </div>
            <div class="text-title-large mb-1">
              Headline
            </div>
            <div class="text-body-small">Greyhound divisely hello coldly fonwderfully</div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn>
            Button
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const variants = ['elevated', 'flat', 'tonal', 'outlined']
  const color = ref('indigo')
</script>
