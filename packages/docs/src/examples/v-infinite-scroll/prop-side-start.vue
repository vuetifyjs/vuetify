<template>
  <v-infinite-scroll
    height="300"
    side="start"
    :load="load"
  >
    <template v-for="(item, index) in items" :key="item">
      <div :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
        Item number {{ item }}
      </div>
    </template>
  </v-infinite-scroll>
</template>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 50 }, (k, v) => v + 1),
    }),

    methods: {
      load () {
        return new Promise(resolve => {
          setTimeout(() => {
            this.items.unshift(...Array.from({ length: 10 }, (k, v) => this.items[0] - (10 - v)))

            resolve('ok')
          }, 1000)
        })
      },
    },
  }
</script>
