<template>
  <div class="text-center">
    <v-rating v-model="rating">
      <template v-slot:item="props">
        <v-icon
          :color="props.isFilled ? genColor(props.index) : 'grey-lighten-1'"
          large
          @click="props.onClick"
        >
          mdi-star-circle{{ props.isFilled ? '' : '-outline' }}
        </v-icon>
      </template>
    </v-rating>
  </div>
</template>

<script>
  export default {
    data: () => ({
      colors: ['green', 'purple', 'orange', 'indigo', 'red'],
      rating: 4.5,
    }),

    methods: {
      genColor (i) {
        return this.colors[i]
      },
    },
  }
</script>
