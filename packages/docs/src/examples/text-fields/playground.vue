<template>
  <v-container
    grid-list-xl
    fluid
  >
    <v-layout wrap>
      <v-flex
        xs12
        sm6
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
      </v-flex>
      <v-flex xs12></v-flex>
      <v-flex
        xs12
        md6
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
        <v-layout>
          <v-switch
            v-model="counterEn"
            class="ma-0 mr-2 ml-1"
            label="Counter"
          ></v-switch>
          <v-slider
            v-model="counter"
            :disabled="!counterEn"
          ></v-slider>
        </v-layout>
      </v-flex>
      <v-flex
        xs12
        md6
      >
        <v-sheet
          elevation="12"
          class="pa-5"
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
          <div class="mt-5 text-xs-center">
            Value: {{ model }}
          </div>
        </v-sheet>
      </v-flex>
    </v-layout>
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
