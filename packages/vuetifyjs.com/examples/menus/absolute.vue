<template>
  <v-layout d-flex justify-center>
    <v-menu v-model="showMenu" offset-y absolute full-width>
      <v-card slot="activator" class="portrait" img="/static/doc-images/cards/girl.jpg" height="300px"></v-card>
      <v-list>
        <v-list-tile v-for="(item, index) in items" :key="index" @click="">
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
