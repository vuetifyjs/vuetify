<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://s3.amazonaws.com/vuetify-docs/images/carousel/squirrel.jpg'
          },
          {
            src: 'https://s3.amazonaws.com/vuetify-docs/images/carousel/sky.jpg'
          },
          {
            src: 'https://s3.amazonaws.com/vuetify-docs/images/carousel/bird.jpg'
          },
          {
            src: 'https://s3.amazonaws.com/vuetify-docs/images/carousel/planet.jpg'
          }
        ]
      }
    }
  }
</script>
