<template>
  <v-app>
    <v-container>
      <v-infinite-scroll ref="infiniteScrollRef" height="300" side="end" @load="load">
        <template v-for="(item, index) in items" :key="index">
          <div :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
            Item number {{ item }}
          </div>
        </template>
      </v-infinite-scroll>
      <v-btn @click="reset">Call reset</v-btn>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
const infiniteScrollRef = ref(null)

const items = ref([])

function reset() {
  items.value = []
  infiniteScrollRef.value.reset()
}

function load({ side, done }) {
  setTimeout(() => {
    if (items.value.length >= 40) {
      done('empty')
      return
    }

    const arr = Array.from({ length: 10 }, (k, v) => (items.value.at(-1) ?? 0) + 1 + v)
    items.value = [...items.value, ...arr]

    done('ok')
  }, 1000)
}
</script>

<script>
export default {
  data: () => ({
    items: []
  }),

  methods: {
    load({ done }) {
      setTimeout(() => {
        if (this.items.length >= 40) {
          done('empty')
          return
        }

        const arr = Array.from({ length: 10 }, (k, v) => (this.items.at(-1) ?? 0) + 1 + v)
        this.items = [...this.items, ...arr]

        done('ok')
      }, 1000)
    },
    reset() {
      this.items = []
      this.$refs.infiniteScrollRef.reset()
    }
  }
}
</script>
