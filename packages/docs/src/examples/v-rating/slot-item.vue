<template>
  <div class="text-center">
    <v-rating v-model="rating">
      <template v-slot:item="props">
        <v-icon
          :color="props.isFilled ? colors[props.index] : 'grey-lighten-1'"
          size="large"
          @click="props.onClick"
        >
          {{ props.isFilled ? 'mdi-star-circle' : 'mdi-star-circle-outline' }}
        </v-icon>
      </template>
    </v-rating>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const colors = ['green', 'purple', 'orange', 'indigo', 'red']

  const rating = ref(4.5)
</script>

<script>
  export default {
    data: () => ({
      colors: ['green', 'purple', 'orange', 'indigo', 'red'],
      rating: 4.5,
    }),
  }
</script>
