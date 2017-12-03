<template>
  <v-layout d-flex justify-center>
    <v-menu offset-y v-model="showMenu" absolute full-width>
      <v-card class="portrait" img="/static/doc-images/cards/girl.jpg" height="300px" slot="activator"></v-card>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      showMenu: false,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    })
  }
</script>

<style lang="stylus" scoped>
  .menu
    max-width: 600px
</style>
