<template>
  <div>
    <v-row
      class="flex"
      justify="center"
    >
      <v-card
        :ripple="false"
        class="portrait"
        height="300px"
        img="https://cdn.vuetifyjs.com/images/cards/girl.jpg"
        @contextmenu="show"
      ></v-card>
    </v-row>

    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
  import { nextTick, ref } from 'vue'

  const items = [
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' },
  ]

  const showMenu = ref(false)
  const x = ref(0)
  const y = ref(0)

  function show (e) {
    e.preventDefault()
    showMenu.value = false
    x.value = e.clientX
    y.value = e.clientY
    nextTick(() => {
      showMenu.value = true
    })
  }
</script>

<script>
  export default {
    data: () => ({
      showMenu: false,
      x: 0,
      y: 0,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),

    methods: {
      show (e) {
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      },
    },
  }
</script>

<style scoped>
.portrait.v-card {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
}
</style>
