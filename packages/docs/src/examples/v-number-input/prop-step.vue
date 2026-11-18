<template>
  <v-container>
    <v-row>
      <v-col>
        <h5 class="my-0">step 2; min:10; max:20</h5>

        <v-number-input
          :max="20"
          :min="10"
          :model-value="15"
          :step="2"
        ></v-number-input>
      </v-col>
      <v-col>
        <h5 class="my-0">step {{ step }}, rounding on blur</h5>
        <v-number-input
          v-model="roundedValue"
          :step="step"
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, shallowRef } from 'vue'

  const step = 50
  const value = shallowRef(100)
  const roundedValue = computed({
    get: () => value.value,
    set: v => value.value = Math.round(v / step) * step,
  })
</script>

<script>
  export default {
    data: () => ({
      value: 100,
      step: 50,
    }),
    computed: {
      roundedValue: {
        get () { return this.value },
        set (v) { this.value = Math.round(v / this.step) * this.step },
      },
    },
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14181-42748"
}
</example-meta>
