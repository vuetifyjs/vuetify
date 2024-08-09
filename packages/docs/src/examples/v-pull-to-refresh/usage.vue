<template>
  <div class="scrollable-container bg-surface-light">
    <v-pull-to-refresh
      :pull-down-threshold="pullDownThreshold"
      @load="load"
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.value"
          :title="item.title"
        ></v-list-item>
      </v-list>
    </v-pull-to-refresh>
  </div>
</template>

<script setup>
  const pullDownThreshold = ref(64)

  let items = [
    {
      title: '1',
      value: 1,
    },
    {
      title: '2',
      value: 2,
    },
    {
      title: '3',
      value: 3,
    },
  ]

  let count = 2

  async function load ({ done }) {
    console.log('loading')
    await new Promise(resolve => setTimeout(() => resolve(), 2000))
    items = Array.from({ length: count * 3 }, (k, v) => ({
      title: `${v + 1}`,
      value: v + 1,
    }))
    console.log('load finish')
    count++
    done('ok')
  }
</script>

<script>
  export default {
    data: () => ({
      pullDownThreshold: 64,
      items: [
        {
          title: '1',
          value: 1,
        },
        {
          title: '2',
          value: 2,
        },
        {
          title: '3',
          value: 3,
        },
      ],
    }),

    methods: {
      async load ({ done }) {
        // Perform API call
        console.log('loading')
        await new Promise(resolve => setTimeout(() => resolve(), 2000))
        this.items = Array.from({ length: 3 }, (k, v) => ({
          title: `${v + 1}`,
          value: v + 1,
        }))
        console.log('load finish')
        done('ok')
      },
    },
  }
</script>

<style>
.scrollable-container {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
