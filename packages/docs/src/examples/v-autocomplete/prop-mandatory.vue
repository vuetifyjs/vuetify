<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="selection"
          :items="items"
          hint="Emptying the search can clear the selection"
          label="Default behavior"
          clearable
          persistent-hint
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="mandatorySelection"
          :items="items"
          hint="Empty the search to choose a replacement"
          label="Mandatory"
          clearable
          mandatory
          persistent-hint
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="4">
        <v-autocomplete
          v-model="mandatorySelections"
          :items="items"
          hint="Remove selections until one remains"
          label="Mandatory multiple"
          chips
          clearable
          closable-chips
          mandatory
          multiple
          persistent-hint
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-btn class="mt-4" @click="resetSelections">
      Reset models
    </v-btn>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const items = ['California', 'Colorado', 'Florida', 'Texas']
  const selection = shallowRef('California')
  const mandatorySelection = shallowRef('California')
  const mandatorySelections = shallowRef(['California', 'Colorado'])

  function resetSelections () {
    selection.value = null
    mandatorySelection.value = null
    mandatorySelections.value = []
  }
</script>
