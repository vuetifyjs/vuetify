<template>
  <v-infinite-scroll
    color="secondary"
    height="400"
    mode="manual"
    @load="load"
  >
    <template v-for="(item, index) in items" :key="item">
      <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
        Item #{{ item }}
      </div>
    </template>
  </v-infinite-scroll>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ref(Array.from({ length: 50 }, (k, v) => v + 1))

  function load ({ done }) {
    setTimeout(() => {
      items.value.push(...Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1))
      done('ok')
    }, 1000)
  }
</script>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 50 }, (k, v) => v + 1),
    }),

    methods: {
      load ({ done }) {
        setTimeout(() => {
          this.items.push(...Array.from({ length: 10 }, (k, v) => v + this.items.at(-1) + 1))

          done('ok')
        }, 1000)
      },
    },
  }
</script>
