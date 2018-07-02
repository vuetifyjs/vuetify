<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade"
      transition="fade"
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

<style lang="stylus">
  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0

      &-enter, &-leave, &-leave-to
        opacity: 0
</style>
