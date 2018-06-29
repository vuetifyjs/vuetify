<template>
  <div class="text-xs-center">
    <v-menu offset-y v-model="showMenu" :position-absolutely="true" full-width>
      <v-card class="portrait" img="/doc-images/cards/girl.jpg" height="300px" slot="activator"></v-card>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showMenu: false,
        x: 0,
        y: 0,
        items: [
          {
            title: 'Click Me'
          },
          {
            title: 'Click Me'
          },
          {
            title: 'Click Me'
          },
          {
            title: 'Click Me 2'
          }
        ]
      }
    },
    methods: {
      show (e) {
        e.preventDefault()
        this.showMenu = true
        this.x = e.clientX
        this.y = e.clientY
      }
    }
  }
</script>

<style lang="stylus">
  .portrait.card
    margin: 0 auto
    max-width: 600px
    width: 100%
</style>
