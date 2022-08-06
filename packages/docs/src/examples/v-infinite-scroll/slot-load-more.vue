<template>
  <v-infinite-scroll
    :load="load"
    mode="manual"
    height="400"
  >
    <template v-for="(item, index) in items" :key="item">
      <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
        Item #{{ item }}
      </div>
    </template>
    <template v-slot:load-more="{ props }">
      <v-btn
        icon="mdi-refresh"
        variant="text"
        size="small"
        v-bind="props"
      ></v-btn>
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
            this.items.push(...Array.from({ length: 10 }, (k, v) => v + this.items.at(-1) + 1))

            resolve('ok')
          }, 1000)
        })
      },
    },
  }
</script>
