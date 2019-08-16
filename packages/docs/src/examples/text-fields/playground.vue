<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          v-model="label"
          label="Label"
        ></v-text-field>
        <v-text-field
          v-model="hint"
          label="Hint"
        ></v-text-field>
        <v-text-field
          v-model="placeholder"
          label="Placeholder"
        ></v-text-field>
      </v-col>
      <v-col cols="12"></v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-switch
          v-model="shaped"
          class="ma-1"
          label="Shaped (requires Filled, Outlined or Solo)"
          :disabled="!outlined && !filled && !solo"
        ></v-switch>
        <v-switch
          v-model="outlined"
          class="ma-1"
          label="Outlined"
        ></v-switch>
        <v-switch
          v-model="rounded"
          class="ma-1"
          label="Rounded (requires Filled, Outlined or Solo)"
          :disabled="!filled && !outlined && !solo"
        ></v-switch>
        <v-switch
          v-model="solo"
          class="ma-1"
          label="Solo"
          :disabled="filled"
        ></v-switch>
        <v-switch
          v-model="singleLine"
          class="ma-1"
          label="Single-line"
        ></v-switch>
        <v-switch
          v-model="filled"
          class="ma-1"
          label="Filled"
          :disabled="outlined || solo"
        ></v-switch>
        <v-switch
          v-model="clearable"
          class="ma-1"
          label="Clearable"
        ></v-switch>
        <v-switch
          v-model="persistentHint"
          class="ma-1"
          label="Persistent Hint"
        ></v-switch>
        <v-switch
          v-model="loading"
          class="ma-1"
          label="Loading"
        ></v-switch>
        <v-switch
          v-model="flat"
          class="ma-1"
          label="Flat (requires Solo)"
          :disabled="!solo"
        ></v-switch>
        <v-row>
          <v-switch
            v-model="counterEn"
            class="ma-0 mr-2 ml-1"
            label="Counter"
          ></v-switch>
          <v-slider
            v-model="counter"
            :disabled="!counterEn"
          ></v-slider>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-sheet
          elevation="12"
          class="pa-12"
        >
          <v-text-field
            v-model="model"
            :label="label"
            :hint="hint"
            :placeholder="placeholder"
            :shaped="shaped"
            :outlined="outlined"
            :rounded="rounded"
            :solo="solo"
            :single-line="singleLine"
            :filled="filled"
            :clearable="clearable"
            :persistent-hint="persistentHint"
            :loading="loading"
            :flat="flat"
            :counter="counterEn ? counter : false"
          ></v-text-field>
          <div class="mt-12 text-center">
            Value: {{ model }}
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      model: 'I\'m a text field',
      label: 'Hey!',
      hint: 'Customize me!',
      placeholder: '',
      shaped: false,
      outlined: false,
      rounded: false,
      solo: false,
      singleLine: false,
      filled: false,
      clearable: false,
      persistentHint: false,
      loading: false,
      flat: false,
      counterEn: false,
      counter: 0,
    }),
  }
</script>
