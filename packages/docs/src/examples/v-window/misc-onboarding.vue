<template>
  <v-card
    theme="dark"
    flat
    rounded="0"
  >
    <v-window v-model="onboarding">
      <v-window-item
        v-for="n in length"
        :key="`card-${n}`"
        :value="n"
      >
        <v-card
          height="200"
          class="d-flex justify-center align-center"
        >
          <span class="text-h2">
            Card {{ n }}
          </span>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn
        variant="plain"
        icon="mdi-chevron-left"
        @click="prev"
      ></v-btn>
      <v-item-group
        v-model="onboarding"
        class="text-center"
        mandatory
      >
        <v-item
          v-for="n in length"
          :key="`btn-${n}`"
          v-slot="{ isSelected, toggle }"
          :value="n"
        >
          <v-btn
            :variant="isSelected ? 'outlined' : 'text'"
            icon="mdi-record"
            @click="toggle"
          ></v-btn>
        </v-item>
      </v-item-group>
      <v-btn
        variant="plain"
        icon="mdi-chevron-right"
        @click="next"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const length = ref(3)
  const onboarding = ref(1)

  function next () {
    onboarding.value = onboarding.value + 1 > length.value ? 1 : onboarding.value + 1
  }
  function prev () {
    onboarding.value = onboarding.value - 1 <= 0 ? length.value : onboarding.value - 1
  }
</script>

<script>
  export default {
    data: () => ({
      length: 3,
      onboarding: 1,
    }),

    methods: {
      next () {
        this.onboarding = this.onboarding + 1 > this.length
          ? 1
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 <= 0
          ? this.length
          : this.onboarding - 1
      },
    },
  }
</script>
