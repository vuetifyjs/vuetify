<template>
  <usage-example
    v-model="model"
    :code="code"
    :script="script"
    :name="name"
    :options="options"
  >
    <div>
      <v-infinite-scroll
        v-bind="props"
        :items="items.value"
        @load="load"
      >
        <template v-for="(item, index) in items" :key="item">
          <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
            Item number {{ item }}
          </div>
        </template>
      </v-infinite-scroll>
    </div>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-infinite-scroll'
  const model = ref('default')
  const options = []
  const items = ref(Array.from({ length: 30 }, (k, v) => v + 1))

  function api () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1))
      }, 1000)
    })
  }

  async function load ({ done }) {
    // Perform API call
    const res = await api()

    items.value.push(...res)

    done('ok')
  }

  const props = computed(() => {
    return {
      height: 300,
      ':items': 'items',
      ':onLoad': 'load',
    }
  })

  const slots = computed(() => {
    return `
  <template v-for="(item, index) in items" :key="item">
    <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
      Item #{{ item }}
    </div>
  </template>
`
  })

  const code = computed(() => {
    return `<v-infinite-scroll${propsToString(props.value)}>${slots.value}</v-infinite-scroll>`
  })

  const script = computed(() => {
    return `export default {
  data: () => ({
    items: [],
  }),

  methods: {
    async api () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1))
        }, 1000)
      })
    },
    async load ({ done }) {
      // Perform API call
      const res = await this.api()

      this.items.push(...res)

      done('ok')
    },
  },
}`
  })
</script>
