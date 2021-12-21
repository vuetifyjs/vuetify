<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      :item-labels="labels"
    >
      <template v-slot:item-label="props">
        <span
          class="font-weight-black text-caption"
          :class="`text-${colors[props.index]}`"
        >
          {{ props.label }}
        </span>
      </template>
    </v-rating>
  </div>
</template>

<script>
  export default {
    data: () => ({
      rating: 4,
      colors: ['red', 'orange', 'grey', 'cyan', 'green'],
      labels: ['bad', 'so so', 'ok', 'good', 'great'],
    }),
  }
</script>
