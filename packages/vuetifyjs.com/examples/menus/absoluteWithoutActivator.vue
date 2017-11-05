<template>
  <div>
    <v-layout flex justify-center>
      <v-card class="portrait" img="/static/doc-images/cards/girl.jpg" height="300px" @contextmenu="show"></v-card>
    </v-layout>
    <v-menu offset-y v-model="showMenu" absolute :position-x="x" :position-y="y">
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
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me 2' }
        ]
      }
    },
    methods: {
      show (e) {
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .portrait.card
    margin: 0 auto
    max-width: 600px
    width: 100%
</style>
