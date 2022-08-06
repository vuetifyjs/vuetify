<template>
  <v-infinite-scroll
    :load="load"
    height="400"
  >
    <template v-for="(item, index) in items" :key="item">
      <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
        Item #{{ item }}
      </div>
    </template>
    <template v-slot:empty>
      <v-alert type="warning">No more items!</v-alert>
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
            resolve('empty')
          }, 1000)
        })
      },
    },
  }
</script>
