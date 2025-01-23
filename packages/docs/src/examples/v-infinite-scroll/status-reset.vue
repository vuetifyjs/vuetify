<template>
  <v-app>
    <v-container>
      <div class="d-flex ga-3">
        <v-chip>Server items: {{ serverItems.length }}</v-chip>
        <v-chip>Loaded items: {{ items.length }}</v-chip>
      </div>
      <v-infinite-scroll ref="scroll" height="300" side="both" @load="load">
        <template v-for="(item, index) in items" :key="index">
          <div :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
            Item number {{ item }}
          </div>
        </template>
      </v-infinite-scroll>

      <div class="d-flex ga-3 mt-2">
        <v-btn @click="prependFewMore(); reset('start')">prepend items + reset('start')</v-btn>
        <v-btn @click="appendFewMore(); reset('end')">append items + reset('end')</v-btn>
        <v-btn @click="reset()">just reset()</v-btn>
      </div>
    </v-container>
  </v-app>
</template>

<script setup>
  import { ref, useTemplateRef } from 'vue'

  const infiniteScrollRef = useTemplateRef('scroll')

  const items = ref([])

  let firstId = 0
  let lastId = 0
  const serverItems = ref(Array.from({ length: 30 }, () => ++lastId))

  function prependFewMore () {
    serverItems.value = [...serverItems.value, ...Array.from({ length: 6 }, () => --firstId)]
  }

  function appendFewMore () {
    serverItems.value = [...serverItems.value, ...Array.from({ length: 6 }, () => ++lastId)]
  }

  function reset (side) {
    infiniteScrollRef.value?.reset(side)
  }

  async function load ({ side, done }) {
    await new Promise(resolve => setTimeout(resolve, 500))

    let page = []
    if (side === 'start') {
      page = loadPreviousPage()
      if (page.length) {
        items.value = [...page, ...items.value]
      }
    }
    if (side === 'end') {
      page = loadNextPage()
      if (page.length) {
        items.value = [...items.value, ...page]
      }
    }
    done(page.length === 10 ? 'ok' : 'empty')
  }

  function loadPreviousPage () {
    const cursor = items.value.at(0) ?? 0
    return serverItems.value.filter(x => x < cursor).reverse().slice(0, 10)
  }

  function loadNextPage () {
    const cursor = items.value.at(-1) ?? 0
    return serverItems.value.filter(x => x > cursor).slice(0, 10)
  }
</script>

<script>
  let firstId = 0
  let lastId = 0
  export default {
    data: () => {
      return {
        items: [],
        serverItems: Array.from({ length: 30 }, () => ++lastId),
      }
    },
    methods: {
      prependFewMore () {
        this.serverItems = [...this.serverItems, ...Array.from({ length: 6 }, () => --firstId)]
      },
      appendFewMore () {
        this.serverItems = [...this.serverItems, ...Array.from({ length: 6 }, () => ++lastId)]
      },
      reset (side) {
        this.$refs.scroll.reset(side)
      },
      async load ({ side, done }) {
        await new Promise(resolve => setTimeout(resolve, 500))

        let page = []
        if (side === 'start') {
          page = this.loadPreviousPage()
          if (page.length) {
            this.items = [...page, ...this.items]
          }
        }
        if (side === 'end') {
          page = this.loadNextPage()
          if (page.length) {
            this.items = [...this.items, ...page]
          }
        }
        done(page.length === 10 ? 'ok' : 'empty')
      },

      loadPreviousPage () {
        const cursor = this.items.at(0) ?? 0
        return this.serverItems.filter(x => x < cursor).reverse().slice(0, 10)
      },

      loadNextPage () {
        const cursor = this.items.at(-1) ?? 0
        return this.serverItems.filter(x => x > cursor).slice(0, 10)
      },
    },
  }
</script>
