<template>
  <div>
    <v-stepper-vertical
      v-model="step"
      :mandatory="false"
      hide-actions
      multiple
      non-linear
    >
      <v-stepper-vertical-item title="Select campaign settings" value="1" editable>
        Step content
      </v-stepper-vertical-item>

      <v-stepper-vertical-item title="Create an ad group" value="2" editable>
        Step content
      </v-stepper-vertical-item>

      <v-stepper-vertical-item title="Create an ad" value="3" editable>
        Step content
      </v-stepper-vertical-item>
    </v-stepper-vertical>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const step = shallowRef([1])
</script>
