<template>
  <v-infinite-scroll
    ref="foo"
    height="500"
    side="both"
    :load="load"
  >
    <div>
      <template v-for="card in cards" :key="card">
        <v-sheet
          :color="card % 2 === 0 ? 'primary' : card % 4 === 0 ? 'secondary' : 'warning'"
          :height="size"
          class="d-flex align-center justify-center"
        >
          <div>{{ card }}</div>
        </v-sheet>
      </template>
    </div>
  </v-infinite-scroll>
</template>

<script>
  export default {
    data: () => ({
      size: 300,
      virtualLength: 12,
      cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }),

    methods: {
      createRange (length, start) {
        return Array.from({ length }).map((_, i) => i + start)
      },
      load (side) {
        const halfVirtualLength = this.virtualLength / 2
        if (side === 'start') {
          const arr = this.createRange(halfVirtualLength, this.cards[0] - halfVirtualLength)
          this.cards = [...arr, ...this.cards.slice(0, halfVirtualLength)]
          this.$nextTick(() => {
            console.log('foo')
            this.$refs.foo.$el.scrollTop = this.$refs.foo.$el.scrollHeight - (halfVirtualLength * this.size) - this.$refs.foo.$el.scrollTop
          })
        } else {
          const arr = this.createRange(halfVirtualLength, this.cards.at(-1) + 1)
          this.cards = [...this.cards.slice(halfVirtualLength), ...arr]
        }

        return 'ok'
      },
    },
  }
</script>
