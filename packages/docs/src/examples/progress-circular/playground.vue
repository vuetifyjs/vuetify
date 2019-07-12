<template>
  <v-layout column justify-center align-center>
    <div class="text-xs-center ma-5">
      <v-progress-circular
        :indeterminate="indeterminate"
        :rotate="rotate"
        :size="size"
        :value="value"
        :width="width"
        color="light-blue"
      >{{ value }}</v-progress-circular>
    </div>

    <v-layout row wrap>
      <v-flex xs12 md3 lg2>
        <v-text-field
          v-model="rotate"
          class="mx-3"
          label="Rotate"
          max="360"
          min="0"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md3 lg2>
        <v-text-field
          v-model="size"
          class="mx-3"
          label="Size - px"
          max="100"
          min="1"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md3 lg2>
        <v-text-field
          v-model="value"
          class="mx-3"
          label="Value - %"
          max="100"
          min="1"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md3 lg2>
        <v-text-field
          v-model="width"
          class="mx-3"
          label="Width - px"
          max="100"
          min="1"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md3 lg2>
        <v-switch v-model="indeterminate" label="Toggle indeterminate" class="mx-3"></v-switch>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      indeterminate: false,
      rotate: 0,
      size: 32,
      value: 0,
      width: 4,
    }),
  }
</script>
