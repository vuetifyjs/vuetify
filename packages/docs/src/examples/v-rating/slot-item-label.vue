<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      :item-labels="labels"
    >
      <template v-slot:item-label="props">
        <span
          :class="`text-${colors[props.index]}`"
          class="font-weight-black text-caption"
        >
          {{ props.label }}
        </span>
      </template>
    </v-rating>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const rating = ref(4)
  const colors = ref(['red', 'orange', 'grey', 'cyan', 'green'])
  const labels = ref(['bad', 'so so', 'ok', 'good', 'great'])
</script>

<script>
  export default {
    data: () => ({
      rating: 4,
      colors: ['red', 'orange', 'grey', 'cyan', 'green'],
      labels: ['bad', 'so so', 'ok', 'good', 'great'],
    }),
  }
</script>
