<template>
  <v-infinite-scroll
    :items="items"
    height="300"
    side="both"
    @load="handleLoad"
  >
    <template v-slot:start>
      <template v-if="error">
        <div>ERROR!</div>
      </template>
      <template v-else-if="empty">
        <div>NO MORE DATA!</div>
      </template>
      <template v-else>
        <v-progress-circular indeterminate color="primary" />
      </template>
    </template>
    <template v-slot:default="{ items: infiniteItems }">
      <template v-for="(item, index) in infiniteItems" :key="item">
        <div :class="['px-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
          Item number {{ item }}
        </div>
      </template>
    </template>
    <template v-slot:end>
      <template v-if="error">
        <div>ERROR!</div>
      </template>
      <template v-else-if="empty">
        <div>NO MORE DATA!</div>
      </template>
      <template v-else>
        <v-progress-circular indeterminate color="primary" />
      </template>
    </template>
  </v-infinite-scroll>
</template>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 50 }, (k, v) => v + 1),
      loading: false,
      error: false,
      empty: false,
      shouldError: false,
    }),

    methods: {
      handleLoad ({ side }) {
        this.loading = side
        setTimeout(() => {
          if (side === 'start') {
            if (this.shouldError) {
              this.error = true
            } else if (this.items[0] <= -10) {
              this.empty = true
            } else {
              const arr = Array.from({ length: 10 }, (k, v) => this.items[0] - (10 - v))
              this.items = [...arr, ...this.items]
            }
          } else if (side === 'end') {
            if (this.shouldError) {
              this.error = true
            } else if (this.items[this.items.length - 1] >= 70) {
              this.empty = true
            } else {
              const arr = Array.from({ length: 10 }, (k, v) => this.items.at(-1) + 1 + v)
              this.items = [...this.items, ...arr]
            }
          }
          this.loading = null
        }, 2000)
      },
    },
  }
</script>
