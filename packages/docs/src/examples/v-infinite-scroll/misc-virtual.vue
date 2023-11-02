<template>
  <v-infinite-scroll
    ref="infinite"
    height="500"
    side="both"
    @load="load"
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

<script setup>
  import { nextTick, ref } from 'vue'

  const infinite = ref()

  const size = ref(300)
  const virtualLength = ref(12)
  const cards = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

  function createRange (length, start) {
    return Array.from({ length }).map((_, i) => i + start)
  }
  function load ({ side, done }) {
    const halfVirtualLength = virtualLength.value / 2
    if (side === 'start') {
      const arr = createRange(halfVirtualLength, cards.value[0] - halfVirtualLength)
      cards.value = [...arr, ...cards.value.slice(0, halfVirtualLength)]
      nextTick(() => {
        infinite.value.$el.scrollTop = infinite.value.$el.scrollHeight - (halfVirtualLength * size.value) - infinite.value.$el.scrollTop
      })
    } else {
      const arr = createRange(halfVirtualLength, cards.value.at(-1) + 1)
      cards.value = [...cards.value.slice(halfVirtualLength), ...arr]
    }
    done('ok')
  }
</script>

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
      load ({ side, done }) {
        const halfVirtualLength = this.virtualLength / 2
        if (side === 'start') {
          const arr = this.createRange(halfVirtualLength, this.cards[0] - halfVirtualLength)
          this.cards = [...arr, ...this.cards.slice(0, halfVirtualLength)]
          this.$nextTick(() => {
            this.$refs.infinite.$el.scrollTop = this.$refs.infinite.$el.scrollHeight - (halfVirtualLength * this.size) - this.$refs.infinite.$el.scrollTop
          })
        } else {
          const arr = this.createRange(halfVirtualLength, this.cards.at(-1) + 1)
          this.cards = [...this.cards.slice(halfVirtualLength), ...arr]
        }

        done('ok')
      },
    },
  }
</script>
