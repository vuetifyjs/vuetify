<template>
  <div class="text-xs-center">
    <v-rating v-model="rating">
      <template v-slot:item="props">
        <v-icon
          :color="props.isFilled ? genColor(props.index) : 'grey lighten-1'"
          large
          @click="props.click"
        >
          {{ props.isFilled ? 'mdi-star-circle' : 'mdi-circle-outline' }}
        </v-icon>
      </template>
    </v-rating>
  </div>
</template>

<script>
  export default {
    data: () => ({
      colors: ['green', 'purple', 'orange', 'indigo', 'red'],
      rating: 4.5
    }),
    methods: {
      genColor (i) {
        return this.colors[i]
      }
    }
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css"]
  }
</codepen-resources>
