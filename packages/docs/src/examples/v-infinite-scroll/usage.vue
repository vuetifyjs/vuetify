<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
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
  </ExamplesUsageExample>
</template>

<script setup>
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
      items: 'items',
      onLoad: 'load',
    }
  })

  const slots = computed(() => {
    return `
  <template v-for="(item, index) in items" :key="item">
    <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
      Item number #{{ item }}
    </div>
  </template>
`
  })

  const code = computed(() => {
    return `<v-infinite-scroll${propsToString(props.value, ['items'])}>${slots.value}</v-infinite-scroll>`
  })

  const script = computed(() => {
    return `<script setup>
  import { ref } from 'vue'

  const items = ref(Array.from({ length: 30 }, (k, v) => v + 1))

  async function api () {
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
<` + '/script>'
  })
</script>
